import { Bar, LatestBarArgs, MarketDataSource } from '@/marketData'
import { cleanBar } from '@/marketData/bars/helpers'
import { RawBar } from '@/marketData/bars/types'

/**
 * @group Market Data
 * @category Bars
 * @param {MarketDataSource} marketDataSource - {@link cryptoSource} or {@link usEquitySource}
 * @param {LatestBarArgs} args
 * @example
 * ```ts
 * // crypto
 * const latestBar = await getLatestBar({
 *   symbol: 'BTCUSD',
 *
 *   // required
 *   exchange: 'CBSE',
 * })
 *
 * // stock
 * const latestBar = await getLatestBar({
 *   symbol: 'AAPL',
 *
 *   // optional
 *   feed: 'sip',
 * })
 * ```
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
