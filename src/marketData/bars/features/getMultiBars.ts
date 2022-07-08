import { Bar, MultiBarsArgs } from '@/marketData/bars/types'
import { MarketDataSource } from '@/marketData/types'
import { getMarketDataPagedMultiArray } from '@/marketData/http'
import { cleanBar } from '@/marketData/bars/helpers'

/**
 * @group Market Data
 * @category Bar
 * @param {MarketDataSource} marketDataSource - {@link cryptoMarketDataSource} or {@link stockMarketDataSource}
 * @param {MultiBarsArgs} args
 */
export const getMultiBars = async (
  marketDataSource: MarketDataSource,
  args: MultiBarsArgs,
): Promise<Record<string, Bar[]>> => {
  const { symbols, timeframe, start, end, absoluteLimit, adjustment } = args

  const queryParams: Record<string, string> = {
    symbols: symbols.join(','),
    timeframe,
    start: start.toISOString(),
    end: end.toISOString(),
    adjustment,
  }

  const data = await getMarketDataPagedMultiArray(
    marketDataSource,
    '/bars',
    queryParams,
    absoluteLimit,
  )

  const result = new Map<string, Bar[]>()

  for (const [symbol, bars] of Object.entries(data)) {
    result.set(
      symbol,
      bars.map((bar) => cleanBar(bar as Bar, symbol)),
    )
  }

  return Object.fromEntries(result)
}
