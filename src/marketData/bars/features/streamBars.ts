import { CancelFn } from '@/types'
import { Bar } from '@/marketData'
import throttle from 'lodash/throttle'
import { MarketDataStream } from '@/marketData/stream'
import { cleanBar } from '@/marketData/bars/helpers'

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
  const cleanHandler = (data: unknown) => {
    handler(cleanBar(data as Bar))
  }
  if (throttleMs > 0) {
    const throttledHandler = throttle(cleanHandler, throttleMs)
    return await MarketDataStream.subscribeTo(symbol, 'bars', throttledHandler)
  }
  return await MarketDataStream.subscribeTo(symbol, 'bars', cleanHandler)
}
