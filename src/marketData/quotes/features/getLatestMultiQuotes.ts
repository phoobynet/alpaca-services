import { Quote } from '../types'
import { MarketDataFeed, MarketDataSource } from '../../types'
import { getMarketDataPagedMultiObject } from '../../http'
import { cleanSymbol } from '../../../common'
import z from 'zod'
import { cleanLatestMultiQuotes } from '../helpers'

export type LatestMultiQuotesArgs = {
  symbols: string[]
  feed: MarketDataFeed
}

const Validation = z.object({
  symbols: z
    .array(
      z.string().nonempty({
        message: 'symbol cannot be empty',
      }),
    )
    .nonempty('symbols is required'),
  feed: z.nativeEnum(MarketDataFeed),
})

export const getLatestMultiQuotes = async (
  marketDataSource: MarketDataSource,
  args: LatestMultiQuotesArgs,
): Promise<Record<string, Quote>> => {
  const { symbols, feed } = Validation.parse(args)

  const queryParams: Record<string, string> = {
    symbols: symbols.map(cleanSymbol).join(','),
    feed,
  }
  const result = await getMarketDataPagedMultiObject(
    marketDataSource,
    '/quotes/latest',
    queryParams,
  )

  return cleanLatestMultiQuotes(result)
}