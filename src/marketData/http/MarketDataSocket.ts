import WebSocket, { CloseEvent, ErrorEvent, MessageEvent } from 'isomorphic-ws'
import { EventEmitter } from 'eventemitter3'
import { options } from '@/options'
import {
  MarketDataSocketMessage,
  MarketDataSocketMessageType,
} from '@/marketData/types'
import { Mutex } from 'async-mutex'

const sockets = new Map<string, MarketDataSocket>()

const mutex = new Mutex()

/**
 * @internal
 * @group Market Data
 * @category HTTP
 */
export class MarketDataSocket extends EventEmitter {
  private socket!: WebSocket
  private isReady = false
  private pendingRequests: Record<string, unknown>[] = []
  private intentionalClosing = false
  private currentSubscription?: MarketDataSocketMessage

  public static CONNECTED_EVENT = 'CONNECTED'
  public static AUTHENTICATED_EVENT = 'AUTHENTICATED'
  public static SUBSCRIBED_EVENT = 'SUBSCRIBED'
  public static IS_READY_EVENT = 'IS_READY'
  public static DRAINING_EVENT = 'DRAINING'
  public static MESSAGES_EVENT = 'MESSAGES'
  public static RESTART_EVENT = 'RESTART'

  private constructor(private url: string) {
    super()
    this.start().catch((e) => {
      throw new Error(e)
    })
  }

  public static async getByUrl(url: string): Promise<MarketDataSocket> {
    const release = await mutex.acquire()
    let marketDataSocket = sockets.get(url)

    if (!marketDataSocket) {
      marketDataSocket = new MarketDataSocket(url)
      sockets.set(url, marketDataSocket)
    }

    release()

    return marketDataSocket
  }

  /**
   * Kill off every socket
   */
  public static closeAllSockets() {
    sockets.forEach((marketDataSocket) => {
      marketDataSocket.close()
    })

    sockets.clear()
  }

  private close() {
    this.intentionalClosing = true
    this.socket.close()
  }

  private async start() {
    console.log('Starting socket', this.url)
    this.socket?.terminate()
    this.socket = new WebSocket(this.url)
    this.socket.onmessage = this.onMessage.bind(this)
    this.socket.onerror = this.onError.bind(this)
    this.socket.onclose = async (event: CloseEvent) => {
      console.log('socket closed', event)
      if (!this.intentionalClosing) {
        await this.start()
        this.emit(MarketDataSocket.RESTART_EVENT)
      }
    }
  }

  private onError(errorEvent: ErrorEvent) {
    // be cool if there is a socket and the socket is open
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      console.warn(errorEvent)
    } else {
      console.log('Ignoring error event', errorEvent)
      console.warn(errorEvent.message)
    }
  }

  private async onMessage(messageEvent: MessageEvent): Promise<void> {
    const messages = JSON.parse(
      messageEvent.data.toString('utf-8'),
    ) as MarketDataSocketMessage[]

    const leading = messages[0]

    if (leading) {
      if (leading.T === MarketDataSocketMessageType.success) {
        if (leading.msg === 'authenticated') {
          this.isReady = true
          this.emit(MarketDataSocket.AUTHENTICATED_EVENT)
          this.emit(MarketDataSocket.IS_READY_EVENT)
          this.intentionalClosing = false
          this.drainPending()
        } else if (leading.msg === 'connected') {
          this.emit(MarketDataSocket.CONNECTED_EVENT)
          this.authenticate()
        }
      } else if (leading.T === MarketDataSocketMessageType.subscription) {
        this.currentSubscription = leading
        this.emit(MarketDataSocket.SUBSCRIBED_EVENT, leading)
        console.log('subscribed', leading)
      } else if (leading.T === MarketDataSocketMessageType.error) {
        console.error('Uh oh:', leading.msg)
        console.log('Attempting restart...')
        this.intentionalClosing = true
        this.socket.close()
        await this.start()

        this.on(MarketDataSocket.IS_READY_EVENT, () => {
          console.log('Attempting restart...SUCCESS')
          if (this.currentSubscription) {
            console.log('Attempting re-subscription')
            this.socket.send(
              JSON.stringify({
                action: 'subscribe',
                trades: this.currentSubscription.trades ?? [],
                quotes: this.currentSubscription.quotes ?? [],
                bars: this.currentSubscription.bars ?? [],
              }),
            )
          }
        })
      } else {
        this.emit(MarketDataSocket.MESSAGES_EVENT, messages)
      }
    }
  }

  private drainPending() {
    if (this.isReady && this.pendingRequests.length) {
      this.emit(
        MarketDataSocket.DRAINING_EVENT,
        `draining ${this.pendingRequests.length} requests`,
      )
      this.pendingRequests.forEach((pendingRequest) => {
        this.send(pendingRequest)
      })
    }
  }

  private authenticate(attempts = 0) {
    const { key, secret, accessToken } = options.get()

    try {
      if (accessToken) {
        this.socket.send(
          JSON.stringify({
            action: 'auth',
            token: accessToken,
          }),
        )
      } else if (key && secret) {
        this.socket.send(
          JSON.stringify({
            action: 'auth',
            key,
            secret,
          }),
        )
      }
    } catch (e) {
      const message = (e as Error).message

      if (attempts < 3) {
        console.warn(
          `Authentication attempt #${attempts} failed with reason "${message}", trying again...`,
        )
        setTimeout(() => {
          this.authenticate(attempts + 1)
        }, 1_000)
      } else {
        throw e
      }
    }
  }

  public send(data: Record<string, unknown>) {
    if (!this.isReady) {
      this.pendingRequests.push(data)
    } else {
      const query = JSON.stringify(data)
      this.socket.send(query)
    }
  }
}
