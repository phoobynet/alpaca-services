import { Quote, QuoteBetweenArgs } from '@/marketData/quotes/types'
import { getMarketDataIterator } from '@/marketData'
import { cleanQuote } from '@/marketData/quotes/helpers'
import { cleanSymbol } from '@/marketData/helpers'

const DEFAULT_ABSOLUTE_LIMIT = 1_000

/**
 * @group Market Data
 * @category Quotes
 * @param {QuoteBetweenArgs} args
 */
export const getQuotesBetween = (
  args: QuoteBetweenArgs,
): AsyncIterable<Quote> => {
  const symbol = cleanSymbol(args.symbol)
  const isCryptoPair = symbol.includes('/')

  const queryParams: Record<string, string> = {
    start: args.start.toISOString(),
    end: args.end.toISOString(),
  }

  let url = `/${args.symbol}/quotes`

  if (isCryptoPair) {
    url = '/quotes'
    queryParams.symbols = args.symbol
  }

  return getMarketDataIterator<Quote>(symbol, {
    url,
    queryParams,
    absoluteLimit: args.absoluteLimit || DEFAULT_ABSOLUTE_LIMIT,
    tidy: (Quote) => cleanQuote(Quote, args.symbol),
  })
}
