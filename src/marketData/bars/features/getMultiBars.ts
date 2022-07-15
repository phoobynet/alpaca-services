import { Bar, MultiBarsArgs } from '@/marketData/bars/types'
import { MarketDataSource } from '@/marketData/types'
import { getMarketDataPagedMultiArray } from '@/marketData/http'
import { cleanBar } from '@/marketData/bars/helpers'

/**
 * @group Market Data
 * @category Bars
 * @param {MarketDataSource} marketDataSource - {@link cryptoSource} or {@link usEquitySource}
 * @param {MultiBarsArgs} args
 * @see {@link BarAdjustment}
 * @example
 * ```ts
 * // crypto
 * const multiBars = await getMultiBars({
 *   // required
 *   symbols: ['BTCUSD', 'ETHUSD'],
 *   // required
 *   timeframe: '1Day',
 *   // required
 *   start: new Date('2022-01-01'),
 *   // required
 *   end: new Date('2022-07-31'),
 *   // required for crypto
 *   exchange: 'CBSE',
 *   // optional
 *   absoluteLimit: 1_000,
 *   // optional
 *   adjustment: BarAdjustment.raw,
 * })
 *
 * // stock
 * const multiBars = await getMultiBars({
 *   // required
 *   symbols: ['AAPL', 'AMZN'],
 *   // required
 *   start: new Date('2022-01-01'),
 *   // required
 *   end: new Date('2022-07-31'),
 *   // optional
 *   feed: 'sip',
 *   // optional
 *   absoluteLimit: 1_000,
 *   // optional
 *   adjustment: BarAdjustment.raw,
 * ```
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
