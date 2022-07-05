import { Snapshot } from '../types'
import { MarketDataSource } from '../../types'
import { cleanSymbol } from '../../../helpers'
import { cleanSnapshot } from '../helpers'
import {
  isCryptoMarketDataSource,
  isStockMarketDataSource,
} from '../../helpers'

export type SnapshotArgs = {
  symbol: string
  feed?: string
  exchange?: string
}

export const getSnapshot = async (
  marketDataSource: MarketDataSource,
  args: SnapshotArgs,
): Promise<Snapshot> => {
  const { feed, symbol, exchange } = args

  const queryParams: Record<string, string> = {}

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

  return marketDataSource
    .get<Snapshot>(`${cleanSymbol(symbol)}/snapshot`, queryParams)
    .then((snapshot) => cleanSnapshot(snapshot, symbol))
}
