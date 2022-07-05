import { MarketDataFeed, MarketDataSource } from '../../types'
import { Snapshot } from '../types'
import { cleanSymbol } from '../../../helpers'
import { cleanSnapshot } from '../helpers'
import {
  isCryptoMarketDataSource,
  isStockMarketDataSource,
} from '../../helpers'

export type MultiSnapshotsArgs = {
  symbols: string[]
  feed?: MarketDataFeed
  exchange?: string
}

export const getMultiSnapshots = async (
  marketDataSource: MarketDataSource,
  args: MultiSnapshotsArgs,
): Promise<Record<string, Snapshot>> => {
  const { exchange, feed, symbols } = args

  const queryParams: Record<string, string> = {
    symbols: symbols.map(cleanSymbol).join(','),
  }

  if (isStockMarketDataSource(marketDataSource)) {
    if (feed) {
      queryParams.feed = feed
    }
  }

  if (isCryptoMarketDataSource(marketDataSource)) {
    if (!exchange) {
      throw new Error('Exchange is required for crypto market data source')
    } else {
      queryParams.exchange = exchange
    }
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
