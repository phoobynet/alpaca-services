import { MarketDataSource } from '@/marketData/types'
import { Quote, RawQuote } from '@/marketData/quotes/types'
import { cleanQuote } from '@/marketData/quotes/helpers'

/**
 * @group Market Data
 * @category Quote
 * @param {MarketDataSource} marketDataSource - {@link cryptoMarketDataSource} or {@link stockMarketDataSource}
 * @param {string} symbol
 */
export const getLatestQuote = (
  marketDataSource: MarketDataSource,
  symbol: string,
): Promise<Quote> => {
  return marketDataSource
    .get<RawQuote>(`${symbol}/quotes/latest`)
    .then((rawQuote) => cleanQuote(rawQuote, symbol))
}
