import { CancelFn } from '@/types'
import { Quote } from '@/marketData'
import throttle from 'lodash/throttle'
import { MarketDataStream } from '@/marketData/stream'

/**
 * @group Market Data
 * @category Quotes
 * @param symbol
 * @param handler
 * @param throttleMs
 */
export const streamQuotes = async (
  symbol: string,
  handler: (q: Quote) => void,
  throttleMs = 500,
): Promise<CancelFn> => {
  if (throttleMs > 0) {
    const throttledHandler = throttle((quote: Quote) => {
      handler(quote)
    }, throttleMs)
    return await MarketDataStream.subscribeTo(
      symbol,
      'quotes',
      throttledHandler,
    )
  }
  return await MarketDataStream.subscribeTo(symbol, 'quotes', handler)
}
