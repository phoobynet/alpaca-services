import { Trade } from '@/marketData/trades/types'
import { Quote } from '@/marketData/quotes/types'
import { Bar } from '@/marketData/bars/types'

export interface Snapshot {
  symbol: string
  latestTrade: Trade
  latestQuote: Quote
  minuteBar: Bar
  dailyBar: Bar
  prevDailyBar: Bar
}
