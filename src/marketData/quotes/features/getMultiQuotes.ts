import { MultiQuotesArgs, Quote } from '@/marketData/quotes/types'
import { cleanMultiQuotes } from '@/marketData/quotes/helpers'
import { MarketDataSource } from '@/marketData/types'
import { getMarketDataPagedMultiArray } from '@/marketData/http'

/**
 * @group Market Data
 * @category Quotes
 * @param {MarketDataSource} marketDataSource - {@link cryptoSource} or {@link usEquitySource}
 * @param {MultiQuotesArgs} args
 */
export const getMultiQuotes = async (
  marketDataSource: MarketDataSource,
  args: MultiQuotesArgs,
): Promise<Record<string, Quote[]>> => {
  const { symbols, start, end, absoluteLimit, feed } = args

  const queryParams: Record<string, string> = {
    symbols: symbols.join(','),
    start: start.toISOString(),
    end: end.toISOString(),
    feed,
  }

  return getMarketDataPagedMultiArray(
    marketDataSource,
    '/quotes',
    queryParams,
    absoluteLimit,
  ).then(cleanMultiQuotes)
}
