import { Snapshot } from '@/marketData/snapshots/types'
import { cleanQuote } from '@/marketData/quotes/helpers'
import { cleanTrade } from '@/marketData/trades/helpers'
import { cleanBar } from '@/marketData/bars/helpers'

/**
 * @internal
 * @group Market Data
 * @category Snapshots
 * @param snapshot
 * @param symbol
 */
export const cleanSnapshot = (snapshot: Snapshot, symbol: string): Snapshot => {
  const { latestTrade, latestQuote, dailyBar, prevDailyBar, minuteBar } =
    snapshot

  return {
    symbol,
    latestQuote: cleanQuote(latestQuote, symbol),
    latestTrade: cleanTrade(latestTrade, symbol),
    minuteBar: minuteBar ? cleanBar(minuteBar, symbol) : undefined,
    dailyBar: dailyBar ? cleanBar(dailyBar, symbol) : undefined,
    prevDailyBar: prevDailyBar ? cleanBar(prevDailyBar, symbol) : undefined,
  }
}
