import { Bar, LatestBarArgs, MarketDataSource } from '@/marketData'
import { cleanBar } from '@/marketData/bars/helpers'
import { RawBar } from '@/marketData/bars/types'

/**
 * @group Market Data
 * @category Bar
 * @param {MarketDataSource} marketDataSource - {@link cryptoMarketDataSource} or {@link stockMarketDataSource}
 * @param {LatestBarArgs} args
 */
export const getLatestBar = (
  marketDataSource: MarketDataSource,
  args: LatestBarArgs,
): Promise<Bar> => {
  const { symbol, ...queryParams } = args

  return marketDataSource
    .get<RawBar>(
      `/${symbol}/bars/latest`,
      queryParams as Record<string, unknown>,
    )
    .then(cleanBar)
}
