import { Snapshot } from '../types'
import { MarketDataSource } from '../../types'
import { cleanSymbol } from '../../../common'
import { cleanSnapshot } from '../helpers'
import { isCryptoMarketDataSource } from '../../helpers'

export const getSnapshot = async (
  marketDataSource: MarketDataSource,
  symbol: string,
  exchange?: string,
): Promise<Snapshot> => {
  if (isCryptoMarketDataSource(marketDataSource)) {
    if (!exchange) {
      throw new Error('Exchange is required for crypto market data source')
    }
  }

  symbol = cleanSymbol(symbol)

  const queryParams: Record<string, string> = {}

  if (exchange) {
    queryParams.exchange = exchange
  }

  return marketDataSource
    .get<Snapshot>(`${symbol}/snapshot`, queryParams)
    .then(cleanSnapshot)
}
