import { Bar, getSource, isCryptoSource, LatestBarArgs } from '@/marketData'
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
  const { symbol, feed } = args

  const cleanedSymbol = cleanSymbol(symbol)

  const source = await getSource(cleanedSymbol)

  if (isCryptoSource(source)) {
    return source
      .get<{ bars: Record<string, RawBar> }>('/latest/bars', {
        symbols: cleanedSymbol,
      })
      .then((data) => cleanBar(data.bars[cleanedSymbol], cleanedSymbol))
  } else {
    const queryParams: Record<string, string> = {}
    if (feed) {
      queryParams.feed = feed
    }
    return source
      .get<RawBar>(`/${symbol}/bars/latest`, queryParams)
      .then(cleanBar)
  }
}
