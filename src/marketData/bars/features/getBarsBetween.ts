import { Bar, BarsBetweenArgs } from '@/marketData/bars/types'
import { MarketDataSource } from '@/marketData/types'
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
 * for await (const bar of getBarsBetween(cryptoSource, args)) {
 *   console.log(bar)
 * }
 * ```
 */
export const getBarsBetween = (
  marketDataSource: MarketDataSource,
  args: BarsBetweenArgs,
): AsyncIterable<Bar> => {
  const {
    symbol,
    start,
    end,
    timeframe,
    exchanges,
    absoluteLimit,
    feed,
    adjustment,
  } = args

  const queryParams: Record<string, string> = {
    start: start instanceof Date ? start.toISOString() : start,
    timeframe,
  }

  if (end) {
    queryParams.end = end instanceof Date ? end.toISOString() : end
  }

  if (exchanges?.length) {
    queryParams.exchanges = exchanges?.join(',')
  }

  if (feed) {
    queryParams.feed = feed
  }

  if (adjustment) {
    queryParams.adjustment = adjustment
  }

  return getMarketDataIterator<Bar>(marketDataSource, {
    url: `/${symbol}/bars`,
    queryParams,
    absoluteLimit: absoluteLimit || DEFAULT_ABSOLUTE_LIMIT,
    tidy: (item) => cleanBar(item, symbol),
  })
}
