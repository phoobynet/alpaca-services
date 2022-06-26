import { MarketDataFeed, MarketDataSource } from '../../types'
import { Snapshot } from '../types'
import { cleanSymbol } from '../../../common'
import { cleanSnapshot } from '../helpers'

export const getMultiSnapshots = async (
  marketDataSource: MarketDataSource,
  symbols: string[],
  feed: MarketDataFeed,
): Promise<Record<string, Snapshot>> => {
  const queryParams: Record<string, string> = {
    symbols: symbols.map(cleanSymbol).join(','),
    feed,
  }
  const multiSnapshot = await marketDataSource<Record<string, Snapshot>>(
    '/snapshots',
    queryParams,
  )

  const cleanedMultiSnapshot: Record<string, Snapshot> = {}

  Object.keys(multiSnapshot).forEach((symbol) => {
    cleanedMultiSnapshot[symbol] = cleanSnapshot(
      multiSnapshot[symbol] as Snapshot,
    )
  })

  return cleanedMultiSnapshot
}
