import { Quote } from '@/marketData/quotes/types'
import { MarketDataFeed, MarketDataSource } from '@/marketData/types'
import { getMarketDataPagedMultiObject } from '@/marketData/http'
import { cleanLatestMultiQuotes } from '@/marketData/quotes/helpers'

export type LatestMultiQuotesArgs = {
  symbols: string[]
  feed: MarketDataFeed
}

export const getLatestMultiQuotes = async (
  marketDataSource: MarketDataSource,
  args: LatestMultiQuotesArgs,
): Promise<Record<string, Quote>> => {
  const { symbols, feed } = args

  const queryParams: Record<string, string> = {
    symbols: symbols.join(','),
    feed,
  }

  return getMarketDataPagedMultiObject(
    marketDataSource,
    '/quotes/latest',
    queryParams,
  ).then(cleanLatestMultiQuotes)
}
