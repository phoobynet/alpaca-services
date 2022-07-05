import { MarketDataFeed, MarketDataSource } from '../../types'
import { Quote } from '../types'
import { getMarketDataPagedMultiArray } from '../../http'
import { cleanSymbol } from '../../../helpers'
import { cleanMultiQuotes } from '../helpers'

export type MultiQuotesArgs = {
  symbols: string[]
  start: Date
  end: Date
  feed: MarketDataFeed
  // absolute limit per symbol (max: 1_000)
  absoluteLimit: number
}

export const getMultiQuotes = async (
  marketDataSource: MarketDataSource,
  args: MultiQuotesArgs,
): Promise<Record<string, Quote[]>> => {
  const { symbols, start, end, absoluteLimit, feed } = args

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
