import { Bar } from '@/marketData'

/**
 * Helper than merges multiple bars into one.  The t field will be the earliest of the t fields of the bars.
 * @remarks The `vw` value will be the sum of the `vw` values of the bars divided by the number of bars (don't trust it).
 * @group Market Data
 * @category Bars
 * @param bars
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
 * const bars: Bar[] = []
 *
 * for await (const bar of getBarsBetween(cryptoSource, args)) {
 *   bars.push(bar)
 * }
 *
 * const singleBar = mergeBars(bars)
 * ```
 */
export const mergeBars = (bars: Bar[] = []): Bar => {
  if (!bars.length) {
    throw new Error('No bars to merge')
  }

  return bars.reduce((prev: Bar, curr: Bar, i) => {
    if (i === 0) {
      return { ...curr }
    }

    return {
      ...prev,
      c: curr.c,
      n: (curr?.n || 0) + (prev.n || 0),
      vw: (curr?.vw || 0) + (prev.vw || 0) / (i + 1),
      h: Math.max(prev.h, curr.h),
      l: Math.min(prev.l, curr.l),
    }
  })
}
