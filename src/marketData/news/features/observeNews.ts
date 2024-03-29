import { NewsArticle } from '@/marketData/news/types'
import { getNewsRealTime } from '@/marketData/http/getNewsRealTime'
import { MarketDataRealTimeSubscriptionEntityType } from '@/marketData'

/**
 * @group Market Data
 * @category News
 * @param symbol
 * @param handler
 */
export const observeNews = async (
  symbol: string,
  handler: (article: NewsArticle) => void,
) => {
  const realTime = await getNewsRealTime()

  return realTime.subscribeTo(
    MarketDataRealTimeSubscriptionEntityType.news,
    symbol,
    (data: unknown) => {
      handler(data as NewsArticle)
    },
  )
}
