import { cleanBar, isValidTimeframe } from '../helpers'
import { getMarketDataIterator } from '../../http'
import { Bar } from '../types'
import { cleanSymbol } from '../../../common'
import { MarketDataSource } from '../../types'
import { isAfter } from 'date-fns'

/**
 * @group Market Data
 * @category Bar
 */
export type BarsBetweenArgs = {
  symbol: string
  start: Date
  end: Date
  /**
   * @example '1Min'
   */
  timeframe: string
  /**
   * The total number of bars to return.
   */
  absoluteLimit?: number
  /**
   * Required for crypto.
   */
  exchange?: string
}

const DEFAULT_ABSOLUTE_LIMIT = 1_000

/**
 * Get bars between two dates.
 * @group Market Data
 * @category Bar
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
  const symbol = cleanSymbol(args.symbol)

  const { start, end, timeframe, exchange, absoluteLimit } = args

  if (!isValidTimeframe(timeframe)) {
    throw new Error(
      `Invalid timeframe, expected something like 1Min, 1Hour, 1Day, 1Week, 1Year etc., but got ${timeframe}`,
    )
  }

  if (marketDataSource.type === 'crypto' && !exchange) {
    throw new Error('Exchange is required for crypto market data')
  }

  if (isAfter(start, end)) {
    throw new Error('Start date cannot be after end date')
  }

  const url = `/${symbol}/bars`
  const queryParams: Record<string, string> = {
    start: start.toISOString(),
    end: end.toISOString(),
    timeframe,
  }

  return getMarketDataIterator<Bar>(marketDataSource, {
    url,
    queryParams,
    absoluteLimit: absoluteLimit || DEFAULT_ABSOLUTE_LIMIT,
    tidy: (item) => cleanBar(item, symbol),
  })
}
