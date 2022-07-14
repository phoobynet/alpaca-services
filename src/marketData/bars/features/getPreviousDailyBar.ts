import { getPreviousCalendar } from '@/tradingData'
import { getBarsBetween } from '@/marketData/bars/features'
import { Bar, PreviousDailyBarArgs } from '@/marketData/bars/types'
import { MarketDataSource } from '@/marketData/types'
import { arrayFromAsyncIterable } from '@/helpers'
import { last } from 'lodash'
import { endOfDay, startOfDay, subDays } from 'date-fns'

/**
 * @group Market Data
 * @category Bars
 * @param marketDataSource
 * @param args
 */
export const getPreviousDailyBar = async (
  marketDataSource: MarketDataSource,
  args: PreviousDailyBarArgs,
): Promise<Bar | undefined> => {
  let bars: Bar[] = []
  if (marketDataSource.type === 'crypto') {
    const yesterday = subDays(new Date(), 1)
    bars = await arrayFromAsyncIterable(
      getBarsBetween(marketDataSource, {
        symbol: args.symbol,
        start: startOfDay(yesterday),
        end: endOfDay(yesterday),
        timeframe: '1Day',
        exchanges: args.exchanges,
      }),
    )
  } else {
    const previousCalendar = await getPreviousCalendar(new Date())

    bars = await arrayFromAsyncIterable(
      getBarsBetween(marketDataSource, {
        symbol: args.symbol,
        start: previousCalendar.date,
        end: previousCalendar.date,
        timeframe: '1Day',
        feed: args.feed,
      }),
    )
  }

  return last(bars)
}
