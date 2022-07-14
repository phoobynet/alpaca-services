import { LatestMultiTradesArgs, Trade } from '@/marketData/trades/types'
import { MarketDataSource } from '@/marketData/types'
import { getMarketDataPagedMultiObject } from '@/marketData/http'
import { cleanLatestMultiTrades } from '@/marketData/trades/helpers'

/**
 * @group Market Data
 * @category Trades
 * @param {MarketDataSource} marketDataSource - {@link cryptoMarketDataSource} or {@link stockMarketDataSource}
 * @param {LatestMultiTradesArgs} args
 */
export const getLatestMultiTrades = async (
  marketDataSource: MarketDataSource,
  args: LatestMultiTradesArgs,
): Promise<Record<string, Trade>> => {
  const { symbols, feed } = args

  const queryParams: Record<string, string> = {
    symbols: symbols.join(','),
    feed,
  }
  return getMarketDataPagedMultiObject(
    marketDataSource,
    '/trades/latest',
    queryParams,
  ).then(cleanLatestMultiTrades)
}
