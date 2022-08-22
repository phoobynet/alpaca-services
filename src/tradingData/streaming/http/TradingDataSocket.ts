import WebSocket, { ErrorEvent, MessageEvent } from 'isomorphic-ws'
import { EventEmitter } from 'eventemitter3'
import { options } from '@/options'
import { TradeUpdate, TradeUpdateHandler } from '@/tradingData/streaming/types'
import { CancelFn } from '@/types'
import { cleanTradeUpdate } from '@/tradingData/streaming/helpers'
import { RawTradeUpdate } from '@/tradingData/streaming/types/RawTrade'

let tradingDataSocket: TradingDataSocket | undefined
const isBrowser = typeof window !== 'undefined'

interface Message {
  stream: string
}

interface AuthorizationMessage extends Message {
  data: {
    status: 'authorized' | 'unauthorized'
    action: 'authenticate' | 'listen'
  }
}

interface TradeUpdateMessage extends Message {
  data: RawTradeUpdate
}

const PAPER_API_URL = 'wss://paper-api.alpaca.markets/stream'
const LIVE_API_URL = 'wss://data.alpaca.markets/stream'

/**
 * @internal
 * @group Trading Data
 * @category Streaming
 */
export class TradingDataSocket extends EventEmitter {
  private handlers: TradeUpdateHandler[] = []
  private socket!: WebSocket
  private isReady = false
  private pendingRequests: Record<string, unknown>[] = []
  private intentionalClosing = false

  public static CONNECTED_EVENT = 'CONNECTED'
  public static SUBSCRIBED_EVENT = 'SUBSCRIBED'
  public static IS_READY_EVENT = 'IS_READY'
  public static DRAINING_EVENT = 'DRAINING'
  public static TRADE_UPDATE = 'MESSAGES'
  public static RESTART_EVENT = 'RESTART'

  private constructor(private url: string) {
    super()
    this.start()
  }

  static instance(): TradingDataSocket {
    if (!tradingDataSocket) {
      const { paper } = options.get()
      tradingDataSocket = new TradingDataSocket(
        paper ? PAPER_API_URL : LIVE_API_URL,
      )

      tradingDataSocket.start()
    }

    return tradingDataSocket
  }

  public observe(handler: (tradeUpdate: TradeUpdate) => void): CancelFn {
    this.handlers.push(handler)

    return () => {
      this.handlers = this.handlers.filter((h) => h !== handler)
    }
  }

  private start() {
    this.socket = new WebSocket(this.url)

    this.socket.onmessage = this.onMessage.bind(this)
    this.socket.onopen = () => {
      if (this.socket.readyState === WebSocket.OPEN) {
        this.authenticate()
      }
    }
    this.socket.onerror = TradingDataSocket.onError
    this.socket.onclose = () => {
      if (!this.intentionalClosing) {
        this.start()
        this.emit(TradingDataSocket.RESTART_EVENT)
      }
    }
  }

  private static onError(errorEvent: ErrorEvent) {
    throw new Error(errorEvent.message)
  }

  private async onMessage(messageEvent: MessageEvent) {
    const data = messageEvent.data
    let rawMessage: string

    if (isBrowser) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      rawMessage = await data.text()
    } else {
      rawMessage = data.toString('utf-8')
    }

    if (!data) {
      throw new Error('TradingDataSocket: empty message')
    }

    let message: Message

    try {
      message = JSON.parse(rawMessage)
    } catch (e) {
      throw new Error(`TradingDataSocket: failed to parse message: ${data}`)
    }

    if (message.stream === 'authorization') {
      const authorizationMessage = message as AuthorizationMessage

      if (authorizationMessage.data.status === 'authorized') {
        this.isReady = true
        this.send({
          action: 'listen',
          data: {
            streams: ['trade_updates'],
          },
        })
        this.drainPending()
      } else if (authorizationMessage.data.status === 'unauthorized') {
        if (authorizationMessage.data.action === 'authenticate') {
          this.authenticate()
        } else {
          throw new Error('TradingDataSocket: unauthorized')
        }
      }
    } else if (this.handlers.length) {
      if (message.stream === 'trade_updates') {
        const tradeUpdateMessage = message as TradeUpdateMessage
        for (const handler of this.handlers) {
          handler(cleanTradeUpdate(tradeUpdateMessage.data))
        }
      }
    }
  }

  private drainPending() {
    if (this.isReady && this.pendingRequests.length) {
      this.emit(
        TradingDataSocket.DRAINING_EVENT,
        `draining ${this.pendingRequests.length} requests`,
      )
      this.pendingRequests.forEach((pendingRequest) => {
        this.send(pendingRequest)
      })
    }
  }

  private authenticate() {
    const { key, secret, accessToken } = options.get()

    if (accessToken) {
      this.socket.send(
        JSON.stringify({
          action: 'authenticate',
          data: {
            oauth_token: accessToken,
          },
        }),
      )
    } else if (key && secret) {
      this.socket.send(
        JSON.stringify({
          action: 'authenticate',
          data: {
            key_id: key,
            secret_key: secret,
          },
        }),
      )
    }
  }

  private send(data: Record<string, unknown>) {
    if (this.isReady) {
      this.socket.send(JSON.stringify(data))
    } else {
      this.pendingRequests.push(data)
    }
  }
}
