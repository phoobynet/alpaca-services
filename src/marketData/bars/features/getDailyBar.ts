import {
  Bar,
  BarTimeframe,
  BarTimeframeUnit,
  DailyBarArgs,
} from '@/marketData/bars/types'
import { MarketDataSource } from '@/marketData/types'
import { isCryptoSource } from '@/marketData/helpers'
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
 * @param marketDataSource
 * @param args
 */
export const getDailyBar = async (
  marketDataSource: MarketDataSource,
  args: DailyBarArgs,
): Promise<Bar | undefined> => {
  let bars: Bar[] = []

  if (isCryptoSource(marketDataSource)) {
    bars = await arrayFromAsyncIterable(
      getBarsBetween(marketDataSource, {
        symbol: args.symbol,
        start: startOfDay(new Date()),
        end: endOfDay(new Date()),
        timeframe: BarTimeframe.from(1, BarTimeframeUnit.minute),
        exchanges: args.exchanges,
      }),
    )
  } else {
    const calendar = await getCalendarForToday()

    if (!calendar) {
      return undefined
    }

    bars = await arrayFromAsyncIterable(
      getBarsBetween(marketDataSource, {
        symbol: args.symbol,
        start: calendar.session_open,
        end: calendar.session_close,
        timeframe: BarTimeframe.from(1, BarTimeframeUnit.minute),
        feed: args.feed,
      }),
    )
  }
  return mergeBars(bars)
}
