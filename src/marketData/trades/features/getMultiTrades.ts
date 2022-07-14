import { MarketDataSource } from '@/marketData/types'
import { MultiTradesArgs, Trade } from '@/marketData/trades/types'
import { getMarketDataPagedMultiArray } from '@/marketData/http'
import { cleanMultiTrades } from '@/marketData/trades/helpers'

/**
 * @group Market Data
 * @category Trades
 * @param {MarketDataSource} marketDataSource - {@link cryptoMarketDataSource} or {@link stockMarketDataSource}
 * @param {MultiTradesArgs} args
 */
export const getMultiTrades = async (
  marketDataSource: MarketDataSource,
  args: MultiTradesArgs,
): Promise<Record<string, Trade[]>> => {
  const { symbols, start, end, absoluteLimit } = args

  const queryParams: Record<string, string> = {
    symbols: symbols.join(','),
    start: start.toISOString(),
    end: end.toISOString(),
  }

  return getMarketDataPagedMultiArray(
    marketDataSource,
    '/trades',
    queryParams,
    absoluteLimit,
  ).then(cleanMultiTrades)
}
