import { MarketDataSource } from '../../types'
import { Bar, BarAdjustment } from '../types'
import { getMarketDataPagedMultiArray } from '../../http'
import { cleanSymbol } from '../../../common'
import { cleanBar, isValidTimeframe } from '../helpers'

export type MultiBarsArgs = {
  symbols: string[]
  timeframe: string
  adjustment: BarAdjustment
  start: Date
  end: Date
  // absolute limit per symbol (default: 1_000)
  absoluteLimit: number
}

export const getMultiBars = async (
  marketDataSource: MarketDataSource,
  args: MultiBarsArgs,
): Promise<Record<string, Bar[]>> => {
  if (!isValidTimeframe(args.timeframe)) {
    throw new Error(`Invalid timeframe: ${args.timeframe}`)
  }

  const queryParams: Record<string, string> = {
    symbols: args.symbols.map(cleanSymbol).join(','),
    timeframe: args.timeframe,
    start: args.start.toISOString(),
    end: args.end.toISOString(),
  }

  const data = await getMarketDataPagedMultiArray(
    marketDataSource,
    '/bars',
    queryParams,
    args.absoluteLimit,
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
