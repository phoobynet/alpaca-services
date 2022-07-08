import { MarketDataFeed } from '@/marketData'

/**
 * {@link getLatestMultiTrades} args.
 * @group Market Data
 * @category Trades
 */
export type LatestMultiTradesArgs = {
  symbols: string[]
  feed: MarketDataFeed
}
