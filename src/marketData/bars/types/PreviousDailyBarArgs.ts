import { MarketDataFeed } from '@/marketData'

/**
 * Arguments for {@link getPreviousDailyBar}
 * @group Market Data
 * @category Bars
 */
export type PreviousDailyBarArgs = {
  symbol: string
  exchanges?: string[]
  feed?: MarketDataFeed
}
