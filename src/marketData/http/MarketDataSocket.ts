import WebSocket, { ErrorEvent, MessageEvent } from 'isomorphic-ws'
import { EventEmitter } from 'eventemitter3'
import { options } from '@/options'
import {
  MarketDataSocketMessage,
  MarketDataSocketMessageType,
} from '@/marketData/types'

const sockets = new Map<string, MarketDataSocket>()

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

  public static CONNECTED_EVENT = 'CONNECTED'
  public static AUTHENTICATED_EVENT = 'AUTHENTICATED'
  public static SUBSCRIBED_EVENT = 'SUBSCRIBED'
  public static IS_READY_EVENT = 'IS_READY'
  public static DRAINING_EVENT = 'DRAINING'
  public static MESSAGES_EVENT = 'MESSAGES'
  public static RESTART_EVENT = 'RESTART'

  private constructor(private url: string) {
    super()
    this.start()
  }

  public static getByUrl(url: string): MarketDataSocket {
    let marketDataSocket = sockets.get(url)

    if (!marketDataSocket) {
      marketDataSocket = new MarketDataSocket(url)
      sockets.set(url, marketDataSocket)
    }

    return marketDataSocket
  }

  private start() {
    this.socket = new WebSocket(this.url)
    this.socket.onmessage = this.onMessage.bind(this)
    this.socket.onerror = this.onError.bind(this)
    this.socket.onclose = () => {
      if (!this.intentionalClosing) {
        this.start()
        this.emit(MarketDataSocket.RESTART_EVENT)
      }
    }
  }

  private onError(errorEvent: ErrorEvent) {
    // be cool if there is a socket and the socket is open
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      console.warn(errorEvent)
    } else {
      throw new Error(errorEvent.message)
    }
  }

  private onMessage(messageEvent: MessageEvent): void {
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
        this.emit(MarketDataSocket.SUBSCRIBED_EVENT, leading)
      } else if (leading.T === MarketDataSocketMessageType.error) {
        console.log(JSON.stringify(leading, null, 2))
        throw new Error(leading.msg)
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
