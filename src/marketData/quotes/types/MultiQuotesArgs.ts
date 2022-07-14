import { MarketDataFeed } from '@/marketData'

/**
 * {@link getMultiQuotes} args
 * @group Market Data
 * @category Quotes
 */
export type MultiQuotesArgs = {
  symbols: string[]
  start: Date
  end: Date
  feed: MarketDataFeed
  // absolute limit per symbol (max: 1_000)
  absoluteLimit: number
}
