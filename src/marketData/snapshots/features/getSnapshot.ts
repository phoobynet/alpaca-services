import { Snapshot, SnapshotArgs } from '@/marketData/snapshots/types'
import { MarketDataSource } from '@/marketData/types'
import { cleanSnapshot } from '@/marketData/snapshots/helpers'

/**
 * @group Market Data
 * @category Snapshots
 * @param {MarketDataSource} marketDataSource - {@link cryptoMarketDataSource} or {@link stockMarketDataSource}
 * @param {SnapshotArgs} args
 */
export const getSnapshot = async (
  marketDataSource: MarketDataSource,
  args: SnapshotArgs,
): Promise<Snapshot> => {
  const { symbol, ...queryParams } = args

  return marketDataSource
    .get<Snapshot>(`${symbol}/snapshot`, queryParams as Record<string, string>)
    .then((snapshot) => cleanSnapshot(snapshot, symbol))
}
