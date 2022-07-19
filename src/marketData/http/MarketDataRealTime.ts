import uniq from 'lodash/uniq'
import { MarketDataSocket } from '@/marketData/http'
import {
  MarketDataSocketMessage,
  MarketDataSocketMessageType,
  MarketDataRealTimeSubscriptionEntityType as SubEntityType,
} from '@/marketData/types'
import { CancelFn } from '@/types'

type MarketDataSocketMessageFilter = (
  message: MarketDataSocketMessage,
) => boolean

/**
 * Used to handle incoming socket messages
 * @group Market Data
 * @category HTTP
 */
type Handler = (t: unknown) => void

/**
 * @internal
 * @group Market Data
 * @category HTTP
 */
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
  private handlers = new Map<SubEntityType, Map<string, Handler[]>>()

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
      this.handlers.set(subscriptionType, new Map<string, Handler[]>())
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
    handler: Handler,
  ): CancelFn {
    const subscribersMap = this.handlers.get(subscriptionEntityType) as Map<
      string,
      Handler[]
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
        Handler[]
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

        for (const symbolMarketDataHandler of symbolMarketDataHandlers) {
          if (subscriptionEntityType !== SubEntityType.news) {
            symbolMarketDataHandler(message)
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

/**
 *
 * @group Common
 * @category Helpers
 * @internal
 * @example
 * ```ts
 * const arr = [1, 2, 3, 4, 5, 6]
 * const [even, odd] = filteredWithRemaining(arr, (x) => x % 2 === 0)
 * ```
 * @param {Array<T>} arr - array being filtered
 * @param {(t: T) => boolean} fn - the filter function
 * @returns {[T[], T[]]} - the results, index 0 contains values that matched your filter, index 1 contains any remaining values that did NOT match your filter
 */
function filteredWithRemaining<T>(arr: T[], fn: (t: T) => boolean): [T[], T[]] {
  const filtered: T[] = []
  const remaining: T[] = []

  for (const t of arr) {
    if (fn(t)) {
      filtered.push(t)
    } else {
      remaining.push(t)
    }
  }

  return [filtered, remaining]
}
