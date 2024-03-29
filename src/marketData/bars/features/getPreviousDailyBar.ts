import { getPreviousCalendar } from '@/tradingData'
import { getBarsBetween } from '@/marketData/bars/features'
import {
  Bar,
  BarTimeframe,
  BarTimeframeUnit,
  DailyBarArgs,
} from '@/marketData/bars/types'
import { arrayFromAsyncIterable } from '@/helpers'
import { last } from 'lodash'
import { endOfDay, startOfDay, subDays } from 'date-fns'
import { cleanSymbol } from '@/marketData/helpers'

/**
 * @group Market Data
 * @category Bars
 * @param {DailyBarArgs} args
 * ```ts
 * async function main() {
 *   const stockBar = await getPreviousDailyBar({
 *     symbol: 'AAPL',
 *   })
 *
 *   console.log(JSON.stringify(stockBar, null, 2))
 *
 *   const cryptoBar = await getPreviousDailyBar({
 *     symbol: 'BTC/USD',
 *     exchanges: ['CBSE'],
 *   })
 *
 *   console.log(JSON.stringify(cryptoBar, null, 2))
 * }
 * ```
 *
 * Results:
 * ```json
 * {
 *   "t": "2022-07-18T04:00:00.000Z",
 *   "o": 150.74,
 *   "h": 151.57,
 *   "l": 146.7,
 *   "c": 147.07,
 *   "v": 81446408,
 *   "n": 620456,
 *   "vw": 149.030641,
 *   "S": "AAPL"
 * }
 * {
 *   "t": "2022-07-18T05:00:00.000Z",
 *   "x": "CBSE",
 *   "o": 21295,
 *   "h": 22961.04,
 *   "l": 21289.14,
 *   "c": 21892.11,
 *   "v": 36065.88615974,
 *   "n": 635956,
 *   "vw": 22112.0871344817,
 *   "S": "BTCUSD"
 * }
 * ```
 */
export const getPreviousDailyBar = async (
  args: DailyBarArgs,
): Promise<Bar | undefined> => {
  let bars: Bar[] = []
  const symbol = cleanSymbol(args.symbol)
  const isCryptoPair = symbol.includes('/')

  if (isCryptoPair) {
    const yesterday = subDays(new Date(), 1)
    bars = await arrayFromAsyncIterable(
      getBarsBetween({
        symbol: args.symbol,
        start: startOfDay(yesterday),
        end: endOfDay(yesterday),
        timeframe: BarTimeframe.from(1, BarTimeframeUnit.minute),
      }),
    )
  } else {
    const previousCalendar = await getPreviousCalendar(new Date())

    bars = await arrayFromAsyncIterable(
      getBarsBetween({
        symbol: args.symbol,
        start: previousCalendar.date,
        end: previousCalendar.date,
        timeframe: BarTimeframe.from(1, BarTimeframeUnit.day),
        feed: args.feed,
      }),
    )
  }

  return last(bars)
}
