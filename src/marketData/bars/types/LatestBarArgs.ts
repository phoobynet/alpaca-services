import { MarketDataFeed } from '../../types'

/**
 * {@link getLatestBar} args.
 * @group Market Data
 * @category Bars
 */
export type LatestBarArgs = {
  symbol: string
  /**
   * Stock only
   */
  feed?: MarketDataFeed
}
