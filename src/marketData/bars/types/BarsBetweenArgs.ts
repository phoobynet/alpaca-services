/**
 * {@link getBarsBetween} args.
 * @group Market Data
 * @category Bars
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
   * Optional for crypto.
   */
  exchanges?: string[]
}
