import { MarketDataFeed } from '@/marketData'

export type PreviousDailyBarArgs = {
  symbol: string
  exchanges?: string[]
  feed?: MarketDataFeed
}
