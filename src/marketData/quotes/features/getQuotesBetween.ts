import { MarketDataSource } from '../../types'
import { Quote } from '../types'
import { ArgumentValidationError, cleanSymbol } from '../../../common'
import { getMarketDataIterator } from '../../http'
import { cleanQuote } from '../helpers'

const DEFAULT_ABSOLUTE_LIMIT = 1_000

export type QuoteBetweenArgs = {
  symbol: string
  start: Date
  end: Date
  absoluteLimit?: number
  exchanges?: string[]
}

export const getQuotesBetween = (
  marketDataSource: MarketDataSource,
  args: QuoteBetweenArgs,
): AsyncIterable<Quote> => {
  if (marketDataSource.type === 'crypto') {
    if (!args.exchanges || args.exchanges.length === 0) {
      throw new ArgumentValidationError(
        'Crypto market data requires at least one exchange',
      )
    }
  }

  const symbol = cleanSymbol(args.symbol)

  const url = `/${args.symbol}/quotes`

  const queryParams: Record<string, string> = {
    start: args.start.toISOString(),
    end: args.end.toISOString(),
  }

  if (args.exchanges) {
    queryParams.exchanges = args.exchanges.join(',')
  }

  return getMarketDataIterator<Quote>(marketDataSource, {
    url,
    queryParams,
    absoluteLimit: args.absoluteLimit || DEFAULT_ABSOLUTE_LIMIT,
    tidy: (Quote) => cleanQuote(Quote, symbol),
  })
}
