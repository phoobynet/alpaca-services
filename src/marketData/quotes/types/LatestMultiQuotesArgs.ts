import { MarketDataFeed } from '@/marketData'

/**
 * Args for {@link getLatestMultiQuotes} request.
 * @group Market Data
 * @category Quotes
 */
export type LatestMultiQuotesArgs = {
  symbols: string[]
  feed: MarketDataFeed
}
