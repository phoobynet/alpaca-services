import { MarketDataFeed } from '@/marketData'

/**
 * @group Market Data
 * @category Snapshots
 */
export type MultiSnapshotsArgs = {
  symbols: string[]
  feed?: MarketDataFeed
}
