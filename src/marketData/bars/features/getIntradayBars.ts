import { Bar, getBarsBetween } from '@/marketData'
import {
  BarTimeframe,
  BarTimeframeUnit,
  IntradayBarsArgs,
} from '@/marketData/bars/types'
import { toUtcDayRange } from '@/helpers'
import { addHours, endOfDay, startOfDay } from 'date-fns'
import { cleanSymbol } from '@/marketData/helpers'

/**
 * @group Market Data
 * @category Bars
 * @param {IntradayBarsArgs} args
 * ```ts
 * async function main() {
 *   const bars: Bar[] = []
 *
 *   for await (const bar of getIntradayBars({
 *     symbol: 'AAPL',
 *     date: new Date('2022-07-19'),
 *   })) {
 *     bars.push(bar)
 *   }
 * }
 * ```
 *
 * Partial Result:
 * ```json
 * [
 *   {
 *     "t": "2022-07-18T23:58:00.000Z",
 *     "o": 146.85,
 *     "h": 146.85,
 *     "l": 146.76,
 *     "c": 146.76,
 *     "v": 2520,
 *     "n": 51,
 *     "vw": 146.815802,
 *     "S": "AAPL"
 *   },
 *   {
 *     "t": "2022-07-18T23:59:00.000Z",
 *     "o": 146.85,
 *     "h": 146.91,
 *     "l": 146.8001,
 *     "c": 146.9,
 *     "v": 3851,
 *     "n": 50,
 *     "vw": 146.872569,
 *     "S": "AAPL"
 *   }
 * ]
 * ```
 */
export const getIntradayBars = (args: IntradayBarsArgs): AsyncIterable<Bar> => {
  let start: Date
  let end: Date

  const symbol = cleanSymbol(args.symbol)
  const isCryptoPair = symbol.includes('/')

  if (isCryptoPair) {
    const arr = toUtcDayRange(args.date)
    start = arr[0]
    end = arr[1]
  } else {
    start = startOfDay(args.date)
    end = addHours(endOfDay(args.date), 3)
  }

  const barsBetweenArgs = {
    symbol: args.symbol,
    start,
    end,
    feed: args.feed,
    timeframe: args.timeframe || BarTimeframe.from(1, BarTimeframeUnit.minute),
    adjustment: args.adjustment,
  }
  return getBarsBetween(barsBetweenArgs)
}
