import { MarketDataFeed } from '@/marketData/types'
import { BarAdjustment } from '@/marketData/bars/types'

/**
 * {@link getBarsSince} args.
 * @group Market Data
 * @category Bars
 */
export type BarsSinceArgs = {
  symbol: string
  /**
   * Removes time string from then encoded date
   */
  since: Date | string
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