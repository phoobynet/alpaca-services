import { MarketDataFeed } from '../../types'

/**
 * {@link getLatestMultiBars} args.
 * @group Market Data
 * @category Bar
 */
export type LatestMultiBarsArgs = {
  symbols: string[]
  /**
   * Stock only
   */
  feed?: MarketDataFeed
  /**
   * Crypto only
   */
  exchange?: string
}
