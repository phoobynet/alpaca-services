import { MarketDataFeed } from '../../types'

/**
 * {@link getLatestBar} args.
 * @group Market Data
 * @category Bar
 */
export type LatestBarArgs = {
  symbol: string
  /**
   * Stock only
   */
  feed?: MarketDataFeed
  /**
   * Crypto only
   */
  exchange?: string
}
