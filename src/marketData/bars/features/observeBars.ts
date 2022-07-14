import {
  getCryptoMarketDataRealTime,
  getStockMarketDataRealTime,
} from '@/marketData/http'
import {
  MarketDataRealTimeSubscriptionEntityType as SubEntityType,
  MarketDataSourceType,
} from '@/marketData/types'
import { Bar } from '@/marketData/bars/types'
import { isCryptoMarketDataSource } from '@/marketData/helpers'
import { cleanBar } from '@/marketData/bars/helpers'

/**
 * @group Market Data
 * @category Bars
 * @param {MarketDataSourceType} marketDataSourceType - {@link cryptoMarketDataSource}, {@link stockMarketDataSource} or {@link MarketDataClass}
 * @param {string} symbol
 * @param {(nextBar: Bar) => void} handler
 * @example
 * ```ts
 * const cancel = observeBars(cryptoMarketDataSource, 'BTCUSD', (nextBar) => {
 *   log(nextBar)
 * })
 *
 * setTimeout(() => {
 *   cancel()
 *   process.exit(0)
 * }, 10_000)
 * ```
 */
export const observeBars = (
  marketDataSourceType: MarketDataSourceType,
  symbol: string,
  handler: (nextBar: Bar) => void,
): (() => void) => {
  const realTime = isCryptoMarketDataSource(marketDataSourceType)
    ? getCryptoMarketDataRealTime()
    : getStockMarketDataRealTime()

  return realTime.subscribeTo(SubEntityType.bar, symbol, (message: unknown) => {
    handler(cleanBar(message as Bar, symbol))
  })
}
