import { Snapshot } from '../types'
import { cleanQuote } from '../../quotes/helpers'
import { cleanTrade } from '../../trades/helpers'
import { cleanBar } from '../../bars/helpers'

export const cleanSnapshot = (snapshot: Snapshot): Snapshot => {
  const {
    symbol,
    latestTrade,
    latestQuote,
    dailyBar,
    prevDailyBar,
    minuteBar,
  } = snapshot
  return {
    symbol,
    latestQuote: cleanQuote(latestQuote, symbol),
    latestTrade: cleanTrade(latestTrade, symbol),
    minuteBar: cleanBar(minuteBar, symbol),
    dailyBar: cleanBar(dailyBar, symbol),
    prevDailyBar: cleanBar(prevDailyBar, symbol),
  }
}
