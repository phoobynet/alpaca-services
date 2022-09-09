import { BarAdjustment, MarketDataFeed } from '@/marketData'
import { BarTimeframe } from '@/marketData/bars/types/BarTimeframe'

/**
 * Args for {@link getIntradayBars} request.
 * @group Market Data
 * @category Bars
 */
export type IntradayBarsArgs = {
  symbol: string
  // when not provided, defaults to today or the previous trading day for equities
  date?: Date
  feed?: MarketDataFeed
  adjustment?: BarAdjustment
  timeframe?: BarTimeframe
}
