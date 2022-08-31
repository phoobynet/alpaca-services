import { CancelFn } from '@/types'
import { Trade } from '@/marketData'
import throttle from 'lodash/throttle'
import { MarketDataStream } from '@/marketData/stream'

/**
 * @group Market Data
 * @category Trades
 * @param symbol
 * @param handler
 * @param throttleMs
 */
export const streamTrades = async (
  symbol: string,
  handler: (t: Trade) => void,
  throttleMs = 500,
): Promise<CancelFn> => {
  if (throttleMs > 0) {
    const throttledHandler = throttle((trade: Trade) => {
      handler(trade)
    }, throttleMs)
    return await MarketDataStream.subscribeTo(
      symbol,
      'trades',
      throttledHandler,
    )
  }
  return await MarketDataStream.subscribeTo(symbol, 'trades', handler)
}
