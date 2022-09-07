import { Bar, BarsBetweenArgs } from '@/marketData/bars/types'
import { getMarketDataIterator } from '@/marketData/http'
import { cleanBar } from '@/marketData/bars/helpers'
import { cleanSymbol } from '@/marketData/helpers'

const DEFAULT_ABSOLUTE_LIMIT = 1_000

/**
 * Get bars between two dates.
 * @group Market Data
 * @category Bars
 * @param {BarsBetweenArgs} args
 * @example
 * ```ts
 * const args: BarsBetweenArgs = {
 *   symbol: 'BTCUSD',
 *   start: new Date('2022-01-01'),
 *   end: new Date('2022-07-31'),
 *   timeframe: '1Hour',
 *   exchange: 'CBSE'
 * }
 *
 * for await (const bar of getBarsBetween(cryptoSource, args)) {
 *   console.log(bar)
 * }
 * ```
 */
export const getBarsBetween = (args: BarsBetweenArgs): AsyncIterable<Bar> => {
  const { start, end, timeframe, absoluteLimit, feed, adjustment } = args

  const symbol = cleanSymbol(args.symbol)
  const isCryptoPair = symbol.includes('/')

  const queryParams: Record<string, string> = {
    start: start instanceof Date ? start.toISOString() : start,
    timeframe: timeframe.toString(),
  }

  if (end) {
    queryParams.end = end instanceof Date ? end.toISOString() : end
  }

  if (feed) {
    queryParams.feed = feed
  }

  if (adjustment) {
    queryParams.adjustment = adjustment
  }

  // vary handling for API inconsistency
  let url = `/${symbol}/bars`

  if (isCryptoPair) {
    queryParams.symbols = symbol
    url = '/bars'
  }

  return getMarketDataIterator<Bar>(symbol, {
    url,
    queryParams,
    absoluteLimit: absoluteLimit || DEFAULT_ABSOLUTE_LIMIT,
    tidy: (item) => cleanBar(item, symbol),
  })
}
