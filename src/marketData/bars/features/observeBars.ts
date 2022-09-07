import { getCryptoRealTime, getUsEquityRealTime } from '@/marketData/http'
import { MarketDataRealTimeSubscriptionEntityType as SubEntityType } from '@/marketData/types'
import { Bar } from '@/marketData/bars/types'
import { cleanSymbol, getSource, isCryptoSource } from '@/marketData/helpers'
import { cleanBar } from '@/marketData/bars/helpers'
import { CancelFn } from '@/types'

/**
 * @group Market Data
 * @category Bars
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
export const observeBars = async (
  symbol: string,
  handler: (nextBar: Bar) => void,
): Promise<CancelFn> => {
  symbol = cleanSymbol(symbol)
  const source = await getSource(symbol)
  const realTime = isCryptoSource(source)
    ? getCryptoRealTime()
    : getUsEquityRealTime()

  return realTime.subscribeTo(SubEntityType.bar, symbol, (message: unknown) => {
    handler(cleanBar(message as Bar, symbol))
  })
}
