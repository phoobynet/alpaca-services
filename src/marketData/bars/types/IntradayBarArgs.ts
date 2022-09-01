import { BarAdjustment, MarketDataFeed } from '@/marketData'
import { BarTimeframe } from '@/marketData/bars/types/BarTimeframe'

/**
 * Args for {@link getIntradayBars} request.
 * @group Market Data
 * @category Bars
 */
export type IntradayBarsArgs = {
  symbol: string
  date: Date
  exchanges?: string[]
  feed?: MarketDataFeed
  adjustment?: BarAdjustment
  timeframe?: BarTimeframe
}
