import { MarketDataSource } from '../../types'
import { Bar, BarAdjustment } from '../types'
import { getMarketDataPagedMultiArray } from '../../http'
import { cleanSymbol } from '../../../common'
import { cleanBar } from '../helpers'
import { validateTimeframe } from '../validators'
import { startIsBeforeEnd } from '../../../common/validators'

const DEFAULT_ABSOLUTE_LIMIT = 1_000

/**
 * @group Market Data
 * @category Bar
 */
export type MultiBarsArgs = {
  symbols: string[]
  timeframe: string
  adjustment: BarAdjustment
  start: Date
  end: Date
  // absolute limit per symbol (max: 1_000)
  absoluteLimit: number
}

export const getMultiBars = async (
  marketDataSource: MarketDataSource,
  args: MultiBarsArgs,
): Promise<Record<string, Bar[]>> => {
  const { symbols, timeframe, start, end, absoluteLimit, adjustment } = args

  validateTimeframe(timeframe)
  startIsBeforeEnd(start, end)

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
