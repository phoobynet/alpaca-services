import {
  Bar,
  BarTimeframe,
  BarTimeframeUnit,
  DailyBarArgs,
} from '@/marketData/bars/types'
import { cleanSymbol } from '@/marketData/helpers'
import { arrayFromAsyncIterable } from '@/helpers'
import { getBarsBetween, mergeBars } from '@/marketData'
import { endOfDay, startOfDay } from 'date-fns'
import { getCalendarForToday } from '@/tradingData'

/**
 * HACK: Returns a single bar representing a daily bar.  See remarks.
 *
 * @remarks - HACK: Unable to use daily timeframe.  Instead, all minutes bars are returned and merged together.  See {@link mergeBars} for details.
 * @group Market Data
 * @category Bars
 * @param args
 */
export const getDailyBar = async (
  args: DailyBarArgs,
): Promise<Bar | undefined> => {
  let bars: Bar[] = []

  const symbol = cleanSymbol(args.symbol)
  const isCryptoPair = symbol.includes('/')

  if (isCryptoPair) {
    bars = await arrayFromAsyncIterable(
      getBarsBetween({
        symbol,
        start: startOfDay(new Date()),
        end: endOfDay(new Date()),
        timeframe: BarTimeframe.from(1, BarTimeframeUnit.minute),
      }),
    )
  } else {
    const calendar = await getCalendarForToday()

    if (!calendar) {
      return undefined
    }

    bars = await arrayFromAsyncIterable(
      getBarsBetween({
        symbol,
        start: calendar.session_open,
        end: calendar.session_close,
        timeframe: BarTimeframe.from(1, BarTimeframeUnit.minute),
        feed: args.feed,
      }),
    )
  }
  return mergeBars(bars)
}
