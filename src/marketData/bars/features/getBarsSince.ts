import { Bar, BarsSinceArgs } from '@/marketData/bars/types'
import { MarketDataSource } from '@/marketData/types'
import { getBarsBetween } from '@/marketData/bars/features'

/**
 * @group Market Data
 * @category Bars
 * @param source
 * @param args
 * @example
 * * ```ts
 * const args: BarsSinceArgs = {
 *   symbol: 'BTCUSD',
 *   since: subWeeks(new Date(), 1),
 *   timeframe: '1Hour',
 *   exchange: 'CBSE'
 * }
 *
 * for await (const bar of getBarsInTheLast(source, args)) {
 *   console.log(bar)
 * }
 * ```
 */
export const getBarsSince = (
  source: MarketDataSource,
  args: BarsSinceArgs,
): AsyncIterable<Bar> => {
  const { since, ...theRest } = args

  return getBarsBetween(source, {
    ...theRest,
    start: since,
    end: new Date(),
  })
}
