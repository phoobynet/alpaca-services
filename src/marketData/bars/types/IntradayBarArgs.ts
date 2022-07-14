import { MarketDataFeed } from '@/marketData'

export type IntradayBarsArgs = {
  symbol: string
  date: Date
  exchanges?: string[]
  feed?: MarketDataFeed
  timeframe?: string
}
