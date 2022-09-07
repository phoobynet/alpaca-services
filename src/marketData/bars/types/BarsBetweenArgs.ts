import { MarketDataFeed } from '@/marketData/types'
import { BarAdjustment, BarTimeframe } from '@/marketData/bars/types'

/**
 * {@link getBarsBetween} args.
 * @group Market Data
 * @category Bars
 */
export type BarsBetweenArgs = {
  symbol: string
  /**
   * Removes time string from then encoded date
   */
  start: Date | string
  end?: Date | string
  timeframe: BarTimeframe
  /**
   * The total number of bars to return.
   */
  absoluteLimit?: number

  /**
   * Optional for stock.
   */
  feed?: MarketDataFeed

  adjustment?: BarAdjustment
}
