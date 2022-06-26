import { MarketDataFeed, MarketDataSource } from '../../types'
import { Quote } from '../types'
import { getMarketDataPagedMultiArray } from '../../http'
import { cleanSymbol } from '../../../common'
import { cleanMultiQuotes } from '../helpers'
import z from 'zod'

const DEFAULT_ABSOLUTE_LIMIT = 1_000

export type MultiQuotesArgs = {
  symbols: string[]
  start: Date
  end: Date
  feed: MarketDataFeed
  // absolute limit per symbol (max: 1_000)
  absoluteLimit: number
}

const MultiQuotesArgsValidation = z.object({
  symbols: z.array(z.string()).nonempty({
    message: 'symbols is required',
  }),
  start: z.date(),
  end: z.date(),
  feed: z.nativeEnum(MarketDataFeed),
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

export const getMultiQuotes = async (
  marketDataSource: MarketDataSource,
  args: MultiQuotesArgs,
): Promise<Record<string, Quote[]>> => {
  const { symbols, start, end, absoluteLimit, feed } =
    MultiQuotesArgsValidation.parse(args)

  const queryParams: Record<string, string> = {
    symbols: symbols.map(cleanSymbol).join(','),
    start: start.toISOString(),
    end: end.toISOString(),
    feed,
  }

  const data = await getMarketDataPagedMultiArray(
    marketDataSource,
    '/quotes',
    queryParams,
    absoluteLimit,
  )

  return cleanMultiQuotes(data)
}
