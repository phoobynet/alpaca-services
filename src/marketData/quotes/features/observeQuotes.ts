import {
  MarketDataRealTimeSubscriptionEntityType,
  MarketDataSourceType,
} from '../../types'
import { isCryptoMarketDataSource } from '../../helpers'
import {
  getCryptoMarketDataRealTime,
  getStockMarketDataRealTime,
} from '../../http'
import { cleanSymbol } from '../../../common'
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
  const realTime = isCryptoMarketDataSource(marketDataSourceType)
    ? getCryptoMarketDataRealTime()
    : getStockMarketDataRealTime()

  symbol = cleanSymbol(symbol)

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
