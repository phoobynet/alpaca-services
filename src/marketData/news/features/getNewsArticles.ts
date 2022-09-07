import { NewsArticle, NewsArticlesArgs } from '@/marketData/news/types'
import { getMarketDataIterator } from '@/marketData'
import { cleanSymbol } from '@/marketData/helpers'

/**
 * @group Market Data
 * @category News
 * @param args
 */
export const getNewsArticles = (
  args: NewsArticlesArgs,
): AsyncIterable<NewsArticle> => {
  const symbol = cleanSymbol(args.symbol)

  const queryParams: Record<string, string> = {
    symbols: symbol,
  }

  if (args.start) {
    queryParams.start = args.start.toISOString()
  }

  if (args.end) {
    queryParams.end = args.end.toISOString()
  }

  if (args.limit) {
    queryParams.limit = args.limit.toString()
  }

  if (args.sort) {
    queryParams.sort = args.sort
  }

  if (args.include_content) {
    queryParams.include_content = args.include_content ? 'true' : 'false'
  }

  if (args.exclude_contentless) {
    queryParams.exclude_contentless = args.exclude_contentless
      ? 'true'
      : 'false'
  }

  return getMarketDataIterator<NewsArticle>(symbol, {
    queryParams,
    url: '/news',
    absoluteLimit: args.limit || 1_000,
  })
}
