import { Bar, BarsSinceArgs } from '@/marketData/bars/types'
import { getBarsBetween } from '@/marketData/bars/features'

/**
 * @group Market Data
 * @category Bars
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
 * for await (const bar of getBarsInTheLast(args)) {
 *   console.log(bar)
 * }
 * ```
 */
export const getBarsSince = (args: BarsSinceArgs): AsyncIterable<Bar> => {
  const { since, ...theRest } = args

  return getBarsBetween({
    ...theRest,
    start: since,
    end: new Date(),
  })
}
