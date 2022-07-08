import { MarketDataFeed } from '@/marketData'

/**
 * {@link getLatest}
 * @group Market Data
 * @category Bar
 */
export type LatestMultiTradesArgs = {
  symbols: string[]
  feed: MarketDataFeed
}
