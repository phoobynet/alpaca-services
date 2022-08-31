import { CancelFn } from '@/types'
import { Bar } from '@/marketData'
import throttle from 'lodash/throttle'
import { MarketDataStream } from '@/marketData/stream'

/**
 * @group Market Data
 * @category Bars
 * @param symbol
 * @param handler
 * @param throttleMs
 */
export const streamBars = async (
  symbol: string,
  handler: (t: Bar) => void,
  throttleMs = 500,
): Promise<CancelFn> => {
  if (throttleMs > 0) {
    const throttledHandler = throttle((bar: Bar) => {
      handler(bar)
    }, throttleMs)
    return await MarketDataStream.subscribeTo(symbol, 'bars', throttledHandler)
  }
  return await MarketDataStream.subscribeTo(symbol, 'bars', handler)
}
