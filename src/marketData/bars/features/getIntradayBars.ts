import { Bar, BarsBetweenArgs, getBarsBetween } from '@/marketData'
import {
  BarTimeframe,
  BarTimeframeUnit,
  IntradayBarsArgs,
} from '@/marketData/bars/types'
import { formatISO } from 'date-fns'
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
  const date = args.date ?? new Date()

  const barsBetweenArgs: BarsBetweenArgs = {
    symbol: cleanSymbol(args.symbol),
    start: formatISO(date, { representation: 'date' }),
    end: formatISO(date, { representation: 'date' }),
    feed: args.feed,
    timeframe: args.timeframe || BarTimeframe.from(1, BarTimeframeUnit.minute),
    adjustment: args.adjustment,
  }
  return getBarsBetween(barsBetweenArgs)
}
