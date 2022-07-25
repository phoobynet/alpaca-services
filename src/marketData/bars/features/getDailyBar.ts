import { Bar, DailyBarArgs } from '@/marketData/bars/types'
import { MarketDataSource } from '@/marketData/types'
import { isCryptoSource } from '@/marketData/helpers'
import { arrayFromAsyncIterable } from '@/helpers'
import { getBarsBetween } from '@/marketData'
import { endOfDay, startOfDay } from 'date-fns'
import { getCalendarForToday } from '@/tradingData'
import { last } from 'lodash'

/**
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
        timeframe: '1Day',
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
        timeframe: '1Day',
        feed: args.feed,
      }),
    )
  }

  return last(bars)
}
