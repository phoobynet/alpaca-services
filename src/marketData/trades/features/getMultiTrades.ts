import { MarketDataSource } from '../../types'
import { Trade } from '../types'
import { getMarketDataPagedMultiArray } from '../../http'
import { cleanSymbol } from '../../../common'
import { cleanMultiTrades } from '../helpers'
import z from 'zod'

const DEFAULT_ABSOLUTE_LIMIT = 1_000

export type MultiTradesArgs = {
  symbols: string[]
  start: Date
  end: Date
  // absolute limit per symbol (max: 1_000)
  absoluteLimit: number
}

const MultiTradesArgsValidation = z.object({
  symbols: z.array(z.string()).nonempty({
    message: 'symbols is required',
  }),
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

export const getMultiTrades = async (
  marketDataSource: MarketDataSource,
  args: MultiTradesArgs,
): Promise<Record<string, Trade[]>> => {
  const { symbols, start, end, absoluteLimit } =
    MultiTradesArgsValidation.parse(args)

  const queryParams: Record<string, string> = {
    symbols: symbols.map(cleanSymbol).join(','),
    start: start.toISOString(),
    end: end.toISOString(),
  }

  const data = await getMarketDataPagedMultiArray(
    marketDataSource,
    '/trades',
    queryParams,
    absoluteLimit,
  )

  return cleanMultiTrades(data)
}
