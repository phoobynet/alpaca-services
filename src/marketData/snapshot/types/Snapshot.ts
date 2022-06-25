import { Trade } from '../../trades'
import { Quote } from '../../quotes'
import { Bar } from '../../bars'

export interface Snapshot {
  symbol: string
  latestTrade: Trade
  latestQuote: Quote
  minuteBar: Bar
  dailyBar: Bar
  prevDailyBar: Bar
}
