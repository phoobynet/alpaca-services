import { MarketDataSource } from '../../types'
import { Bar, BarAdjustment } from '../types'
import { getMarketDataPagedMultiArray } from '../../http'
import { cleanSymbol } from '../../../common'
import { cleanBar, isValidTimeframe } from '../helpers'
import z from 'zod'

const DEFAULT_ABSOLUTE_LIMIT = 1_000

export type MultiBarsArgs = {
  symbols: string[]
  timeframe: string
  adjustment: BarAdjustment
  start: Date
  end: Date
  // absolute limit per symbol (max: 1_000)
  absoluteLimit: number
}

const MultiBarsArgsValidation = z.object({
  symbols: z.array(z.string()).nonempty({
    message: 'symbols is required',
  }),
  timeframe: z.custom((value) => isValidTimeframe(value as string), {
    message: 'timeframe is invalid',
  }),
  adjustment: z.nativeEnum(BarAdjustment),
  start: z.date(),
  end: z.date(),
  absoluteLimit: z
    .number()
    .min(1, {
      message: 'absoluteLimit must be greater than 0',
    })
    .max(DEFAULT_ABSOLUTE_LIMIT, {
      message: 'absoluteLimit must be between 1 and 1,000',
    })
    .default(DEFAULT_ABSOLUTE_LIMIT),
})

export const getMultiBars = async (
  marketDataSource: MarketDataSource,
  args: MultiBarsArgs,
): Promise<Record<string, Bar[]>> => {
  const { symbols, timeframe, start, end, absoluteLimit, adjustment } =
    MultiBarsArgsValidation.parse(args)

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
