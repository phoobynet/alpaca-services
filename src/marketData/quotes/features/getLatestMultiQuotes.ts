import { Quote } from '../types'
import { MarketDataFeed, MarketDataSource } from '../../types'
import { getMarketDataPagedMultiObject } from '../../http'
import { cleanSymbol } from '../../../helpers'
import { cleanLatestMultiQuotes } from '../helpers'

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
