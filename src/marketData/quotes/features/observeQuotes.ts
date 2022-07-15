import {
  MarketDataRealTimeSubscriptionEntityType,
  MarketDataSourceType,
} from '../../types'
import { isCryptoSource } from '../../helpers'
import { getCryptoRealTime, getUsEquityRealTime } from '../../http'
import { Quote } from '../types'
import { cleanQuote } from '../helpers'
import throttle from 'lodash/throttle'
import { MarketDataSocketMessageHandler } from '../../http'

export const observeQuotes = (
  marketDataSourceType: MarketDataSourceType,
  symbol: string,
  onQuote: (Quote: Quote) => void,
  throttleMs = 0,
) => {
  const realTime = isCryptoSource(marketDataSourceType)
    ? getCryptoRealTime()
    : getUsEquityRealTime()

  let update: MarketDataSocketMessageHandler = (Quote) =>
    onQuote(cleanQuote(Quote as Quote, symbol))

  if (throttleMs > 0) {
    update = throttle((Quote) => {
      onQuote(cleanQuote(Quote as Quote, symbol))
    }, throttleMs)
  }

  return realTime.subscribeTo(
    MarketDataRealTimeSubscriptionEntityType.quote,
    symbol,
    update,
  )
}
