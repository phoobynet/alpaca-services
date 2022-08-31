import {
  MarketDataRealTimeSubscriptionEntityType,
  MarketDataSourceType,
} from '@/marketData/types'
import { isCryptoSource } from '@/marketData/helpers'
import { getCryptoRealTime, getUsEquityRealTime } from '@/marketData/http'
import { Quote } from '../types'
import { cleanQuote } from '@/marketData/quotes/helpers'
import throttle from 'lodash/throttle'

/**
 * @deprecated Use {@link streamQuotes} instead.
 * @group Market Data
 * @category Quotes
 * @param marketDataSourceType
 * @param symbol
 * @param onQuote
 * @param throttleMs
 */
export const observeQuotes = (
  marketDataSourceType: MarketDataSourceType,
  symbol: string,
  onQuote: (Quote: Quote) => void,
  throttleMs = 0,
) => {
  const realTime = isCryptoSource(marketDataSourceType)
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
