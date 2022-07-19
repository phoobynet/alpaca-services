import {
  MarketDataRealTimeSubscriptionEntityType,
  MarketDataSourceType,
} from '@/marketData/types'
import { isCryptoSource } from '@/marketData/helpers'
import { getCryptoRealTime, getUsEquityRealTime } from '@/marketData/http'
import { Trade } from '@/marketData/trades/types'
import { cleanTrade } from '@/marketData/trades/helpers'
import throttle from 'lodash/throttle'

/**
 * Real-time trade observation.
 * @group Market Data
 * @category Trades
 * @param {MarketDataSourceType} marketDataSourceType - {@link cryptoSource}, {@link usEquitySource}, or {@link MarketDataClass}
 * @param {string} symbol
 * @param {(trade: Trade) => void} onTrade
 * @param {number} throttleMs - throttle trade updates to this many milliseconds
 * ```ts
 * function main() {
 *   const cancel = observeTrades(
 *     cryptoSource,
 *     'BTCUSD',
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
export const observeTrades = (
  marketDataSourceType: MarketDataSourceType,
  symbol: string,
  onTrade: (trade: Trade) => void,
  throttleMs = 0,
) => {
  const realTime = isCryptoSource(marketDataSourceType)
    ? getCryptoRealTime()
    : getUsEquityRealTime()

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
