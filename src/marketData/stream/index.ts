import { WebSocket, MessageEvent, ErrorEvent } from 'isomorphic-ws'
import { options } from '@/options'
import {
  Bar,
  MarketDataClass,
  MarketDataSocketMessage,
  MarketDataSocketMessageType,
  Quote,
  Trade,
} from '@/marketData'
import { EventEmitter } from 'eventemitter3'
import { CancelFn } from '@/types'
import { cleanTrade } from '@/marketData/trades/helpers'
import { cleanQuote } from '@/marketData/quotes/helpers'
import { cleanBar } from '@/marketData/bars/helpers'
import { getAsset } from '@/tradingData'

let _usEquityStream: MarketDataStream | undefined
let _cryptoStream: MarketDataStream | undefined

type SubscriptionType = 'trades' | 'quotes' | 'bars'
type Handler = (message: unknown) => void
type HandlerSet = Set<Handler>

export class MarketDataStream extends EventEmitter {
  private socket: WebSocket
  private tradeHandlers = new Map<string, HandlerSet>()
  private quoteHandlers = new Map<string, HandlerSet>()
  private barsHandlers = new Map<string, HandlerSet>()

  private constructor(url: string) {
    super()
    this.socket = new WebSocket(url)
    this.socket.onopen = this.onOpen.bind(this)
    this.socket.onmessage = this.onMessage.bind(this)
    this.socket.onerror = this.onError.bind(this)
  }

  private getHandlers(type: SubscriptionType): Map<string, HandlerSet> {
    switch (type) {
      case 'trades':
        return this.tradeHandlers
      case 'quotes':
        return this.quoteHandlers
      case 'bars':
        return this.barsHandlers
      default:
        throw new Error('Set type not supported')
    }
  }

  private getHandlerSet(type: SubscriptionType, symbol: string): HandlerSet {
    const handlers = this.getHandlers(type)

    if (!handlers.has(symbol)) {
      handlers.set(symbol, new Set<Handler>())
    }

    return handlers.get(symbol) as HandlerSet
  }

  private onOpen() {
    const { key, secret } = options.get()

    this.socket.send(
      JSON.stringify({
        action: 'auth',
        key,
        secret,
      }),
    )
  }

  private onMessage(messageEvent: MessageEvent) {
    const messages = JSON.parse(
      messageEvent.data.toString('utf-8'),
    ) as MarketDataSocketMessage[]
    const leading = messages[0]

    if (leading) {
      if (leading.T === MarketDataSocketMessageType.success) {
        if (leading.msg === 'authenticated') {
          this.emit('open')
        }
      } else if (leading.T === MarketDataSocketMessageType.subscription) {
        // TODO: handle subscription
      } else if (leading.T === MarketDataSocketMessageType.error) {
        console.log(JSON.stringify(leading, null, 2))
        throw new Error(leading.msg)
      } else {
        for (const message of messages) {
          let handlerSet: HandlerSet | undefined
          if (message.T === 't') {
            handlerSet = this.tradeHandlers.get(message.S as string)
          } else if (message.T === 'q') {
            handlerSet = this.quoteHandlers.get(message.S as string)
          } else if (message.T === 'b') {
            handlerSet = this.barsHandlers.get(message.S as string)
          }

          if (handlerSet) {
            for (const handler of handlerSet) {
              handler(message)
            }
          }
        }
      }
    }
  }

  private onError(errorEvent: ErrorEvent) {
    this.emit('error', errorEvent)
  }

  public static async subscribeTo<T extends Trade | Quote | Bar>(
    symbol: string,
    type: SubscriptionType,
    handler: (t: T) => void,
  ): Promise<CancelFn> {
    const asset = await getAsset(symbol)
    if (!asset) {
      throw new Error('Unknown asset')
    }

    let instance: MarketDataStream

    if (asset.class === MarketDataClass.crypto) {
      instance = await MarketDataStream.getCryptoInstance()
    } else if (asset.class === MarketDataClass.us_equity) {
      instance = await MarketDataStream.getUsEquityInstance()
    } else {
      throw new Error('Unsupported asset class')
    }

    const handlerSet = instance.getHandlerSet(type, symbol)

    let wrappedHandler: Handler

    switch (type) {
      case 'trades':
        wrappedHandler = (message: unknown) => {
          const trade = cleanTrade(message as Trade)
          handler(trade as T)
        }
        handlerSet.add(wrappedHandler)
        break
      case 'quotes':
        wrappedHandler = (message: unknown) => {
          const quote = cleanQuote(message as Quote)
          handler(quote as T)
        }
        break
      case 'bars':
        wrappedHandler = (message: unknown) => {
          const bar = cleanBar(message as Bar)
          handler(bar as T)
        }
        break
      default:
        throw new Error('Set type not supported')
    }

    if (wrappedHandler) {
      handlerSet.add(wrappedHandler)
    }

    const subscriptionMessage = JSON.stringify({
      action: 'subscribe',
      [type]: [symbol],
    })

    console.log(subscriptionMessage)

    instance.socket.send(subscriptionMessage)

    return () => {
      handlerSet.delete(wrappedHandler)
      if (handlerSet.size === 0) {
        instance.socket.send(
          JSON.stringify({
            action: 'unsubscribe',
            trades: [symbol],
          }),
        )
      }
    }
  }

  private static async getUsEquityInstance(): Promise<MarketDataStream> {
    // TODO: duplication
    if (_usEquityStream) {
      return _usEquityStream
    } else {
      return new Promise((resolve, reject) => {
        const stream = new MarketDataStream(
          'wss://stream.data.alpaca.markets/v2/sip',
        )
        stream.on('open', () => {
          _usEquityStream = stream
          resolve(stream)
        })
        stream.on('error', (error: ErrorEvent) => {
          reject(error)
        })
      })
    }
  }

  private static async getCryptoInstance(): Promise<MarketDataStream> {
    if (_cryptoStream) {
      return _cryptoStream
    } else {
      return new Promise((resolve, reject) => {
        const stream = new MarketDataStream(
          'wss://stream.data.alpaca.markets/v1beta2/crypto',
        )
        stream.on('open', () => {
          _usEquityStream = stream
          resolve(stream)
        })
        stream.on('error', () => {
          reject(new Error('MarketDataStream failed to open'))
        })
      })
    }
  }
}
