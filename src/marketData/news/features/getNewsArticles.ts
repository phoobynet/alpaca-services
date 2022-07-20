import { NewsArticle, NewsArticlesArgs } from '@/marketData/news/types'
import { getMarketDataIterator } from '@/marketData'
import { newsSource } from '@/marketData/news/http'

/**
 * @group Market Data
 * @category News
 * @param args
 */
export const getNewsArticles = (
  args: NewsArticlesArgs,
): AsyncIterable<NewsArticle> => {
  const queryParams: Record<string, string> = {}

  if (args.symbols?.length) {
    queryParams.symbols = args.symbols.join(',')
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

  return getMarketDataIterator<NewsArticle>(newsSource, {
    queryParams,
    url: '',
    absoluteLimit: args.limit || 1_000,
  })
}
