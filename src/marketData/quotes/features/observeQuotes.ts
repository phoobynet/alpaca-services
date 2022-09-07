import { MarketDataRealTimeSubscriptionEntityType } from '@/marketData/types'
import { cleanSymbol, getSource, isCryptoSource } from '@/marketData/helpers'
import { getCryptoRealTime, getUsEquityRealTime } from '@/marketData/http'
import { Quote } from '../types'
import { cleanQuote } from '@/marketData/quotes/helpers'
import throttle from 'lodash/throttle'
import { CancelFn } from '@/types'

/**
 * @group Market Data
 * @category Quotes
 * @param symbol
 * @param onQuote
 * @param throttleMs
 */
export const observeQuotes = async (
  symbol: string,
  onQuote: (Quote: Quote) => void,
  throttleMs = 0,
): Promise<CancelFn> => {
  symbol = cleanSymbol(symbol)
  const source = await getSource(symbol)
  const realTime = isCryptoSource(source)
    ? getCryptoRealTime()
    : getUsEquityRealTime()

  let update = (quote: unknown): void =>
    onQuote(cleanQuote(quote as Quote, symbol))

  if (throttleMs > 0) {
    update = throttle((quote: unknown) => {
      onQuote(cleanQuote(quote as Quote, symbol))
    }, throttleMs)
  }

  return realTime.subscribeTo(
    MarketDataRealTimeSubscriptionEntityType.quote,
    symbol,
    update,
  )
}
