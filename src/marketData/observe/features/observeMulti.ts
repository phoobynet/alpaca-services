import {
  getCryptoMarketDataRealTime,
  getStockMarketDataRealTime,
  MarketDataEntity,
  MarketDataSocketMessageHandler,
  MarketDataSocketMessageHandlerCancellation,
  MarketDataSourceType,
} from '@/marketData'
import { isCryptoMarketDataSource } from '@/marketData/helpers'
import throttle from 'lodash/throttle'
import { ObserveMultiArgs } from '@/marketData/observe/types'

/**
 * Observe market data for multiple symbols.
 * @group Market Data
 * @category Observe
 * @param {MarketDataSourceType} marketDataSourceType
 * @param {ObserveMultiArgs<T extends MarketDataEntity>} args
 * @example
 * ```ts
 * // I want to observe trades for multiple symbols.
 * const cancel = observeMulti<Trade>(MarketDataClass.crypto, {
 *   onUpdate: (update: Record<string, Trade>) => {
 *     console.log(update)
 *   },
 *   symbols: ['BTCUSD', 'ETHUSD'],
 *   throttleMs: 500,
 *   subscriptionEntityType: MarketDataRealTimeSubscriptionEntityType.trade,
 * })
 *
 * setTimeout(() => {
 *   cancel()
 * }, 10_000)
 *
 * setTimeout(() => {
 *   cancel()
 * }, 10_000)
 * ```
 * Output
 * ```json
 {
  "ETHUSD": {
    "T": "t",
    "S": "ETHUSD",
    "x": "CBSE",
    "p": 1189.64,
    "s": 0.002,
    "t": "2022-07-10T09:18:45.31991Z",
    "i": 314658438,
    "tks": "B"
  },
  "BTCUSD": {
    "T": "t",
    "S": "BTCUSD",
    "x": "CBSE",
    "p": 21328.05,
    "s": 0.00058829,
    "t": "2022-07-10T09:18:45.101286Z",
    "i": 372964770,
    "tks": "B"
  }
}
 * ```
 */
export const observeMulti = <T extends MarketDataEntity>(
  marketDataSourceType: MarketDataSourceType,
  args: ObserveMultiArgs<T>,
): MarketDataSocketMessageHandlerCancellation => {
  const realTime = isCryptoMarketDataSource(marketDataSourceType)
    ? getCryptoMarketDataRealTime()
    : getStockMarketDataRealTime()

  let state: Record<string, T> = {}

  let update: MarketDataSocketMessageHandler = (data: unknown): void => {
    const t = data as T

    const newState: Record<string, T> = {
      ...state,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      [t.S!]: t,
    }

    state = newState
    args.onUpdate({ ...newState })
  }

  if (args.throttleMs || 0 > 0) {
    update = throttle(update, args.throttleMs)
  }

  const cancel: MarketDataSocketMessageHandlerCancellation[] = []

  args.symbols.forEach((symbol) => {
    cancel.push(
      realTime.subscribeTo(args.subscriptionEntityType, symbol, update),
    )
  })

  return () => {
    cancel.forEach((cancel) => cancel())
  }
}
