import { MarketDataSource } from '../../types'
import { Quote, RawQuote } from '../types'
import { cleanSymbol } from '../../../common'
import { cleanQuote } from '../helpers'

export const getLatestQuote = (
  marketDataSource: MarketDataSource,
  symbol: string,
): Promise<Quote> => {
  symbol = cleanSymbol(symbol)

  return marketDataSource
    .get<RawQuote>(`${symbol}/quotes/latest`)
    .then((rawQuote) => cleanQuote(rawQuote, symbol))
}
