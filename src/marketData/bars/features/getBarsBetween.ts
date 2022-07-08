import { MarketDataSource, Bar, BarsBetweenArgs } from '@/marketData'
import { getMarketDataIterator } from '@/marketData/http'
import { cleanBar } from '@/marketData/bars/helpers'

const DEFAULT_ABSOLUTE_LIMIT = 1_000

/**
 * Get bars between two dates.
 * @group Market Data
 * @category Bars
 * @param {MarketDataSource} marketDataSource
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
 * for await (const bar of getBarsBetween(args)) {
 *   console.log(bar)
 * }
 * ```
 */
export const getBarsBetween = (
  marketDataSource: MarketDataSource,
  args: BarsBetweenArgs,
): AsyncIterable<Bar> => {
  const { symbol, start, end, timeframe, exchanges, absoluteLimit } = args

  const queryParams: Record<string, string> = {
    start: start.toISOString(),
    end: end.toISOString(),
    timeframe,
  }

  if (exchanges?.length) {
    queryParams.exchanges = exchanges?.join(',')
  }

  return getMarketDataIterator<Bar>(marketDataSource, {
    url: `/${symbol}/bars`,
    queryParams,
    absoluteLimit: absoluteLimit || DEFAULT_ABSOLUTE_LIMIT,
    tidy: (item) => cleanBar(item, symbol),
  })
}
