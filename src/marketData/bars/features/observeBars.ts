import { getCryptoRealTime, getUsEquityRealTime } from '@/marketData/http'
import {
  MarketDataRealTimeSubscriptionEntityType as SubEntityType,
  MarketDataSourceType,
} from '@/marketData/types'
import { Bar } from '@/marketData/bars/types'
import { isCryptoSource } from '@/marketData/helpers'
import { cleanBar } from '@/marketData/bars/helpers'

/**
 * @deprecated Use {@link streamBars} instead.
 * @group Market Data
 * @category Bars
 * @param {MarketDataSourceType} marketDataSourceType - {@link cryptoSource}, {@link usEquitySource} or {@link MarketDataClass}
 * @param {string} symbol
 * @param {(nextBar: Bar) => void} handler
 * @example
 * ```ts
 * const cancel = observeBars(cryptoSource, 'BTCUSD', (nextBar) => {
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
  const realTime = isCryptoSource(marketDataSourceType)
    ? getCryptoRealTime()
    : getUsEquityRealTime()

  return realTime.subscribeTo(SubEntityType.bar, symbol, (message: unknown) => {
    handler(cleanBar(message as Bar, symbol))
  })
}
