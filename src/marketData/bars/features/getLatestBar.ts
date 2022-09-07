import { Bar, getSource, LatestBarArgs } from '@/marketData'
import { cleanBar } from '@/marketData/bars/helpers'
import { RawBar } from '@/marketData/bars/types'
import { cleanSymbol } from '@/marketData/helpers'

/**
 * @group Market Data
 * @category Bars
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
export const getLatestBar = async (args: LatestBarArgs): Promise<Bar> => {
  const { symbol, ...queryParams } = args

  const source = await getSource(cleanSymbol(symbol))

  return source
    .get<RawBar>(
      `/${symbol}/bars/latest`,
      queryParams as Record<string, unknown>,
    )
    .then(cleanBar)
}
