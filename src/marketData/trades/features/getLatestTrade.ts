import { MarketDataSource } from '../../types'
import { RawTrade, Trade } from '../types'
import { cleanSymbol } from '../../../helpers'
import { cleanTrade } from '../helpers'
import { isCryptoMarketDataSource } from '../../helpers'

/**
 * Retrieves the latest trade for a given symbol.
 * @group Market Data
 * @category Trades
 * @remarks For {@link cryptoMarketDataSource} an exchange must be provided
 * @param {MarketDataSource} marketDataSource
 * @param {string} symbol
 * @param {string} [exchange] - required for crypto requests
 */
export const getLatestTrade = async (
  marketDataSource: MarketDataSource,
  symbol: string,
  exchange?: string,
): Promise<Trade> => {
  if (isCryptoMarketDataSource(marketDataSource)) {
    if (!exchange) {
      throw new Error('Exchange is required for crypto requests')
    }
  }

  const queryParams: Record<string, string> = {}
  if (exchange) {
    queryParams.exchange = exchange
  }

  return marketDataSource
    .get<RawTrade>(`${cleanSymbol(symbol)}/trades/latest`, queryParams)
    .then(cleanTrade)
}
