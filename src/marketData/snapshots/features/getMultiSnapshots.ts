import { MarketDataSource } from '@/marketData/types'
import { MultiSnapshotsArgs, Snapshot } from '@/marketData/snapshots/types'
import { cleanSnapshot } from '@/marketData/snapshots/helpers'

/**
 * @group Market Data
 * @category Snapshots
 * @param {MarketDataSource} marketDataSource - {@link cryptoMarketDataSource} or {@link stockMarketDataSource}
 * @param args
 */
export const getMultiSnapshots = async (
  marketDataSource: MarketDataSource,
  args: MultiSnapshotsArgs,
): Promise<Record<string, Snapshot>> => {
  const { symbols, ...qp } = args

  const queryParams: Record<string, string> = {
    symbols: symbols.join(','),
    ...qp,
  }

  let multiSnapshot = await marketDataSource.get<Record<string, unknown>>(
    '/snapshots',
    queryParams,
  )

  // slight variance in the API for crypto market data source
  if ('snapshots' in multiSnapshot) {
    multiSnapshot = multiSnapshot.snapshots as Record<string, Snapshot>
  }

  const cleanedMultiSnapshot: Record<string, Snapshot> = {}

  Object.keys(multiSnapshot).forEach((symbol) => {
    cleanedMultiSnapshot[symbol] = cleanSnapshot(
      multiSnapshot[symbol] as Snapshot,
      symbol,
    )
  })

  return cleanedMultiSnapshot
}
