import { MarketDataFeed } from '@/marketData/types'
import { BarAdjustment } from '@/marketData/bars/types'

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

  /**
   * Optional for stock.
   */
  feed?: MarketDataFeed

  adjustment?: BarAdjustment
}
