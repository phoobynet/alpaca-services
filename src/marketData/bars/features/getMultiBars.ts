import { MarketDataSource } from '../../types'
import { Bar } from '../types'
import { getMarketDataPagedMultiArray } from '../../http'
import { cleanSymbol } from '../../../helpers'
import { cleanBar } from '../helpers'
import { assertTimeframe } from '../assertions'
import { assertStartBeforeEnd } from '../../../assertions'
import { MultiBarsArgs } from '../types'

export const getMultiBars = async (
  marketDataSource: MarketDataSource,
  args: MultiBarsArgs,
): Promise<Record<string, Bar[]>> => {
  const { symbols, timeframe, start, end, absoluteLimit, adjustment } = args

  assertTimeframe(timeframe)
  assertStartBeforeEnd(start, end)

  const queryParams: Record<string, string> = {
    symbols: symbols.map(cleanSymbol).join(','),
    timeframe: timeframe,
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
