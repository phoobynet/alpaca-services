import { CancelFn } from '@/types'
import { Quote } from '@/marketData'
import throttle from 'lodash/throttle'
import { MarketDataStream } from '@/marketData/stream'
import { cleanQuote } from '@/marketData/quotes/helpers'

/**
 * @deprecated
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
  const cleanHandler = (data: unknown) => {
    handler(cleanQuote(data as Quote))
  }
  if (throttleMs > 0) {
    const throttledHandler = throttle(cleanHandler, throttleMs)
    return await MarketDataStream.subscribeTo(
      symbol,
      'quotes',
      throttledHandler,
    )
  }
  return await MarketDataStream.subscribeTo(symbol, 'quotes', cleanHandler)
}
