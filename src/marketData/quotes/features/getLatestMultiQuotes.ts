import { LatestMultiQuotesArgs, Quote } from '@/marketData/quotes/types'
import { MarketDataSource } from '@/marketData/types'
import { getMarketDataPagedMultiObject } from '@/marketData/http'
import { cleanLatestMultiQuotes } from '@/marketData/quotes/helpers'

/**
 * @group Market Data
 * @category Quotes
 * @param marketDataSource
 * @param {LatestMultiQuotesArgs} args
 * @example
 * ```ts
 * const data = await getLatestMultiQuotes(usEquitySource, {
 *   symbols: ['AAPL', 'MSFT'],
 *   feed: MarketDataFeed.sip,
 * })
 * ```
 *
 * Result:
 * ```json
 * {
 *   "AAPL": {
 *     "t": "2022-07-18T23:59:58.578Z",
 *     "ax": "P",
 *     "ap": 146.92,
 *     "as": 3,
 *     "bx": "P",
 *     "bp": 146.91,
 *     "bs": 4,
 *     "c": [
 *       "R"
 *     ],
 *     "z": "C",
 *     "S": "AAPL"
 *   },
 *   "MSFT": {
 *     "t": "2022-07-18T23:59:59.024Z",
 *     "ax": "P",
 *     "ap": 255.05,
 *     "as": 2,
 *     "bx": "P",
 *     "bp": 254.93,
 *     "bs": 3,
 *     "c": [
 *       "R"
 *     ],
 *     "z": "C",
 *     "S": "MSFT"
 *   }
 * }
 * ```
 */
export const getLatestMultiQuotes = async (
  marketDataSource: MarketDataSource,
  args: LatestMultiQuotesArgs,
): Promise<Record<string, Quote>> => {
  const { symbols, feed } = args

  const queryParams: Record<string, string> = {
    symbols: symbols.join(','),
    feed,
  }

  return getMarketDataPagedMultiObject(
    marketDataSource,
    '/quotes/latest',
    queryParams,
  ).then(cleanLatestMultiQuotes)
}
