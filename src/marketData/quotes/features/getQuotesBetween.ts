import { MarketDataSource } from '@/marketData/types'
import { Quote, QuoteBetweenArgs } from '@/marketData/quotes/types'
import { getMarketDataIterator } from '@/marketData'
import { cleanQuote } from '@/marketData/quotes/helpers'

const DEFAULT_ABSOLUTE_LIMIT = 1_000

/**
 * @group Market Data
 * @category Quotes
 * @param {MarketDataSource} marketDataSource - {@link cryptoSource} or {@link usEquitySource}
 * @param {QuoteBetweenArgs} args
 */
export const getQuotesBetween = (
  marketDataSource: MarketDataSource,
  args: QuoteBetweenArgs,
): AsyncIterable<Quote> => {
  const queryParams: Record<string, string> = {
    start: args.start.toISOString(),
    end: args.end.toISOString(),
  }

  if (args.exchanges?.length) {
    queryParams.exchanges = args.exchanges.join(',')
  }

  return getMarketDataIterator<Quote>(marketDataSource, {
    url: `/${args.symbol}/quotes`,
    queryParams,
    absoluteLimit: args.absoluteLimit || DEFAULT_ABSOLUTE_LIMIT,
    tidy: (Quote) => cleanQuote(Quote, args.symbol),
  })
}
