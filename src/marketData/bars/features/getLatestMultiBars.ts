import {
  Bar,
  getMarketDataPagedMultiObject,
  LatestMultiBarsArgs,
  MarketDataSource,
} from '@/marketData'
import { cleanLatestMultiBars } from '@/marketData/bars/helpers'

/**
 * @group Market Data
 * @category Bar
 * @param {MarketDataSource} marketDataSource - {@link cryptoMarketDataSource} or {@link stockMarketDataSource}
 * @param {LatestMultiBarsArgs} args
 */
export const getLatestMultiBars = async (
  marketDataSource: MarketDataSource,
  args: LatestMultiBarsArgs,
): Promise<Record<string, Bar>> => {
  if (args.symbols.length === 0) {
    throw new Error('symbols is empty')
  }

  const queryParams: Record<string, string> = {}

  queryParams.symbols = args.symbols.join(',')
  // noinspection DuplicatedCode
  return getMarketDataPagedMultiObject(
    marketDataSource,
    '/bars/latest',
    queryParams,
  ).then(cleanLatestMultiBars)
}
