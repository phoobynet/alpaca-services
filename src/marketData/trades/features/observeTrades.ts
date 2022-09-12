import { MarketDataRealTimeSubscriptionEntityType } from '@/marketData/types'
import { cleanSymbol, getSource, isCryptoSource } from '@/marketData/helpers'
import { getCryptoRealTime, getUsEquityRealTime } from '@/marketData/http'
import { Trade } from '@/marketData/trades/types'
import { cleanTrade } from '@/marketData/trades/helpers'
import throttle from 'lodash/throttle'
import { CancelFn } from '@/types'

/**
 * Real-time trade observation.
 * @group Market Data
 * @category Trades
 * @param {string} symbol
 * @param {(trade: Trade) => void} onTrade
 * @param {number} throttleMs - throttle trade updates to this many milliseconds
 * ```ts
 * function main() {
 *   const cancel = observeTrades(
 *     cryptoSource,
 *     'BTC/USD',
 *     (trade: Trade): void => {
 *       console.log(JSON.stringify(trade, null, 2))
 *     },
 *     500,
 *   )
 *
 *   // monitor for 10 seconds
 *   setTimeout(() => {
 *     // make sure you cancel!
 *     cancel()
 *     process.exit(0)
 *   }, 10_000)
 * }
 *
 * main()
 * ```
 */
export const observeTrades = async (
  symbol: string,
  onTrade: (trade: Trade) => void,
  throttleMs = 0,
): Promise<CancelFn> => {
  symbol = cleanSymbol(symbol)
  const source = await getSource(symbol)
  const realTime = isCryptoSource(source)
    ? await getCryptoRealTime()
    : await getUsEquityRealTime()

  let update = (trade: unknown) => onTrade(cleanTrade(trade as Trade, symbol))

  if (throttleMs > 0) {
    update = throttle((trade: unknown) => {
      onTrade(cleanTrade(trade as Trade, symbol))
    }, throttleMs)
  }

  return realTime.subscribeTo(
    MarketDataRealTimeSubscriptionEntityType.trade,
    symbol,
    update,
  )
}
