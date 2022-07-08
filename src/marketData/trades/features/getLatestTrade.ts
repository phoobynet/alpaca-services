import { MarketDataSource } from '@/marketData/types'
import { RawTrade, Trade } from '@/marketData/trades/types'
import { cleanTrade } from '@/marketData/trades/helpers'

/**
 * @group Market Data
 * @category Trades
 * @param {MarketDataSource} marketDataSource - {@link cryptoMarketDataSource} or {@link stockMarketDataSource}
 * @param {string} symbol
 * @param {string} [exchange] - required for crypto requests
 */
export const getLatestTrade = async (
  marketDataSource: MarketDataSource,
  symbol: string,
  exchange?: string,
): Promise<Trade> => {
  const queryParams: Record<string, string> = {}

  if (exchange) {
    queryParams.exchange = exchange
  }

  return marketDataSource
    .get<RawTrade>(`${symbol}/trades/latest`, queryParams)
    .then(cleanTrade)
}
