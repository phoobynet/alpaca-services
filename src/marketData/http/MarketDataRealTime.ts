import { uniq } from 'lodash'
import { MarketDataSocket } from './MarketDataSocket'
import {
  MarketDataSocketMessage,
  MarketDataSocketMessageType,
  MarketDataRealTimeSubscriptionEntityType as SubEntityType,
} from '../types'
import { cleanSymbol, filteredWithRemaining } from '../../common'
import { cleanMarketDataEntity } from '../helpers'

type MarketDataSocketMessageFilter = (
  message: MarketDataSocketMessage,
) => boolean
export type MarketDataSocketMessageHandlerCancellation = () => void
export type MarketDataSocketMessageHandler<T> = (t: T) => void

export class MarketDataRealTime {
  private isReady = false
  private pendingSubscriptions = new Map<SubEntityType, string[]>()
  private subscription: Record<string, string[]> = {
    trades: [],
    quotes: [],
    bars: [],
  }
  /**
   * Nest map that stores the entity type -> symbol -> handlers
   * @private
   */
  private handlers = new Map<
    SubEntityType,
    Map<string, MarketDataSocketMessageHandler<unknown>[]>
  >()

  private messageFilters = new Map<
    MarketDataSocketMessageType,
    MarketDataSocketMessageFilter
  >()

  public constructor(private marketDataSocket: MarketDataSocket) {
    this.marketDataSocket.on(MarketDataSocket.IS_READY_EVENT, () => {
      this.isReady = true
      this.drainPending()
    })
    this.marketDataSocket.on(
      MarketDataSocket.MESSAGES_EVENT,
      this.MarketDataSocketMessagesHandler.bind(this),
    )
    this.marketDataSocket.on(
      MarketDataSocket.SUBSCRIBED_EVENT,
      (subscription: Record<string, string[]>) => {
        this.subscription = subscription
      },
    )
    this.marketDataSocket.on(MarketDataSocket.RESTART_EVENT, () => {
      const { trades, quotes, bars } = this.subscription

      this.marketDataSocket.send({
        trades,
        quotes,
        bars,
      })
    })

    for (const [, subscriptionType] of Object.entries(SubEntityType)) {
      this.handlers.set(
        subscriptionType,
        new Map<string, MarketDataSocketMessageHandler<unknown>[]>(),
      )
    }

    for (const value of Object.values(MarketDataSocketMessageType)) {
      this.messageFilters.set(
        value,
        (message: MarketDataSocketMessage) => message.T === value,
      )
    }
  }

  public subscribeTo(
    subscriptionEntityType: SubEntityType,
    symbol: string,
    handler: MarketDataSocketMessageHandler<unknown>,
  ): MarketDataSocketMessageHandlerCancellation {
    symbol = cleanSymbol(symbol)
    const subscribersMap = this.handlers.get(subscriptionEntityType) as Map<
      string,
      MarketDataSocketMessageHandler<unknown>[]
    >
    const symbolSubscribers = subscribersMap.get(symbol)

    if (symbolSubscribers) {
      subscribersMap.set(symbol, [...symbolSubscribers, handler])
    } else {
      subscribersMap.set(symbol, [handler])

      if (!this.isReady) {
        const symbolsPendingOfType =
          this.pendingSubscriptions.get(subscriptionEntityType) ?? []
        this.pendingSubscriptions.set(
          subscriptionEntityType,
          uniq([...symbolsPendingOfType, symbol]),
        )
      } else if (this.isReady && this.pendingSubscriptions.size) {
        this.drainPending()
        this.sendSubscribe(subscriptionEntityType, symbol)
      } else if (this.isReady) {
        this.sendSubscribe(subscriptionEntityType, symbol)
      }
    }

    return () => {
      const subscribersMap = this.handlers.get(subscriptionEntityType) as Map<
        string,
        MarketDataSocketMessageHandler<unknown>[]
      >
      let symbolSubscribers = subscribersMap.get(symbol) ?? []

      symbolSubscribers = symbolSubscribers.filter((s) => s !== handler)

      if (symbolSubscribers.length === 0) {
        subscribersMap.delete(symbol)
        this.sendUnsubscribe(subscriptionEntityType, symbol)
      } else {
        subscribersMap.set(symbol, symbolSubscribers)
      }
    }
  }

  cancelAll() {
    this.handlers.forEach((entityTypeHandlers, subscriptionEntityType) => {
      entityTypeHandlers.forEach((_, symbol) => {
        this.sendUnsubscribe(subscriptionEntityType, symbol)
      })
    })

    this.handlers.clear()
  }

  private MarketDataSocketMessagesHandler(messages: MarketDataSocketMessage[]) {
    let next = messages
    for (const key of this.handlers.keys()) {
      next = this.distribute(key, next)
    }
  }

  private sendSubscribe(
    subscriptionEntityType: SubEntityType,
    symbol: string,
  ): void {
    this.marketDataSocket.send({
      action: 'subscribe',
      [subscriptionEntityType]: [symbol],
    })
  }

  private sendUnsubscribe(
    subscriptionEntityType: SubEntityType,
    symbol: string,
  ): void {
    this.marketDataSocket.send({
      action: 'unsubscribe',
      [subscriptionEntityType]: [symbol],
    })
  }

  /**
   * Distribute the messages to subscribers of a given subscription entity type, e.g. quote
   * @param {MarketDataRealTimeSubscriptionEntityType} subscriptionEntityType
   * @param {MarketDataSocketMessage[]} messages
   * @private
   */
  private distribute(
    subscriptionEntityType: SubEntityType,
    messages: MarketDataSocketMessage[],
  ) {
    const subscriptionEntityTypeHandlers = this.handlers.get(
      subscriptionEntityType,
    )

    let filter: MarketDataSocketMessageFilter = () => false

    // Could this be simplified?
    if (subscriptionEntityType === SubEntityType.bar) {
      filter = this.messageFilters.get(
        MarketDataSocketMessageType.bar,
      ) as MarketDataSocketMessageFilter
    } else if (subscriptionEntityType === SubEntityType.trade) {
      filter = this.messageFilters.get(
        MarketDataSocketMessageType.trade,
      ) as MarketDataSocketMessageFilter
    } else if (subscriptionEntityType === SubEntityType.quote) {
      filter = this.messageFilters.get(
        MarketDataSocketMessageType.quote,
      ) as MarketDataSocketMessageFilter
    } else if (subscriptionEntityType === SubEntityType.news) {
      filter = this.messageFilters.get(
        MarketDataSocketMessageType.news,
      ) as MarketDataSocketMessageFilter
    } else if (subscriptionEntityType === SubEntityType.orderbooks) {
      filter = this.messageFilters.get(
        MarketDataSocketMessageType.orderbooks,
      ) as MarketDataSocketMessageFilter
    }

    if (subscriptionEntityTypeHandlers?.size) {
      const [messagesIWant, messagesIDoNotWant] = filteredWithRemaining(
        messages,
        filter,
      )

      for (const message of messagesIWant) {
        const symbolMarketDataHandlers =
          subscriptionEntityTypeHandlers.get(message.S as string) ?? []

        // crypto quotes are so different from equity quotes that I make them look
        // like equity quotes
        let m: MarketDataSocketMessage = message
        if (subscriptionEntityType === SubEntityType.quote && 'x' in message) {
          m = {
            ...message,
            ax: message.x,
            bx: message.x,
          }
        }

        for (const symbolMarketDataHandler of symbolMarketDataHandlers) {
          if (subscriptionEntityType !== SubEntityType.news) {
            symbolMarketDataHandler(
              cleanMarketDataEntity(m as { t: string; S?: string }),
            )
          }
        }
      }
      return messagesIDoNotWant
    }

    return messages
  }

  private drainPending() {
    if (this.isReady && this.pendingSubscriptions.size) {
      this.pendingSubscriptions.forEach((symbols, subscriptionType) => {
        this.marketDataSocket.send({
          action: 'subscribe',
          [subscriptionType]: symbols,
        })
      })
      this.pendingSubscriptions.clear()
    }
  }
}