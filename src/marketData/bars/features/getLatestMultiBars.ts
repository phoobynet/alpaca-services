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
 * @example
 * ```ts
 * // crypto
 * const latestMultiBars = await getLatestMultiBars({
 *   symbols: ['BTCUSD', 'ETHUSD'],
 * })
 *
 * // stock
 * const latestMultiBars = await getLatestMultiBars({
 *   symbols: ['AAPL', 'MSFT'],
 * })
 * ```
 */
export const getLatestMultiBars = async (
  marketDataSource: MarketDataSource,
  args: LatestMultiBarsArgs,
): Promise<Record<string, Bar>> => {
  const queryParams: Record<string, string> = {
    symbol: args.symbols.join(','),
  }

  return getMarketDataPagedMultiObject(
    marketDataSource,
    '/bars/latest',
    queryParams,
  ).then(cleanLatestMultiBars)
}
