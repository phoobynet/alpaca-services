import { cleanBar } from '../helpers'
import { getMarketDataIterator } from '../../http'
import { Bar, BarsBetweenArgs } from '../types'
import { MarketDataSource } from '../../types'
import { assertTimeframe } from '../assertions'
import { isCryptoMarketDataSource } from '../../helpers'
import { cleanSymbol } from '../../../helpers'
import { assertStartBeforeEnd } from '../../../assertions'

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

  assertTimeframe(timeframe)
  assertStartBeforeEnd(start, end)

  if (isCryptoMarketDataSource(marketDataSource) && !exchange) {
    throw new Error('Exchange is required for crypto market data')
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
