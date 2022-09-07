import { MarketDataFeed } from '@/marketData/types'
import { BarAdjustment, BarTimeframe } from '@/marketData/bars/types'

/**
 * {@link getBarsInTheLast} args.
 * @group Market Data
 * @category Bars
 */
export type BarsInTheLastArgs = {
  symbol: string
  /**
   * See {@link MS} for a selection of millisecond constants.
   * Milliseconds.
   */
  inTheLast: number
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
