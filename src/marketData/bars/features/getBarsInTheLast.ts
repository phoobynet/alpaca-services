import { Bar, BarsInTheLastArgs } from '@/marketData/bars/types'
import { getBarsBetween } from '@/marketData/bars/features'

/**
 * Returns bars in the last n milliseconds.
 * @group Market Data
 * @category Bars
 * @remarks See {@link MS} for a selection of millisecond constants.
 * @param {BarsInTheLastArgs} args
 * @example
 * ```ts
 * const args: BarsInTheLastArgs = {
 *   symbol: 'BTCUSD',
 *   inTheLast: 1 * MS.WEEK,
 *   timeframe: '1Hour',
 *   exchange: 'CBSE'
 * }
 *
 * for await (const bar of getBarsInTheLast(source, args)) {
 *   console.log(bar)
 * }
 * ```
 */
export const getBarsInTheLast = (
  args: BarsInTheLastArgs,
): AsyncIterable<Bar> => {
  const { inTheLast, ...theRest } = args

  const now = new Date()

  return getBarsBetween({
    ...theRest,
    start: new Date(now.getTime() - inTheLast),
    end: now,
  })
}
