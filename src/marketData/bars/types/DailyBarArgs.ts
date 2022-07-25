import { MarketDataFeed } from '@/marketData'

/**
 * Arguments for {@link getPreviousDailyBar} and {@link getDailyBar}.
 * @group Market Data
 * @category Bars
 */
export type DailyBarArgs = {
  symbol: string
  exchanges?: string[]
  feed?: MarketDataFeed
}
