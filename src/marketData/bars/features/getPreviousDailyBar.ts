import { getPreviousCalendar } from '@/tradingData'
import { getBarsBetween } from '@/marketData/bars/features'
import { Bar } from '@/marketData/bars/types'
import { MarketDataSource } from '@/marketData/types'
import { arrayFromAsyncIterable } from '@/helpers'
import { last } from 'lodash'

/**
 * @group Market Data
 * @category Bars
 * @param marketDataSource
 * @param symbol
 */
export const getPreviousDailyBar = async (
  marketDataSource: MarketDataSource,
  symbol: string,
): Promise<Bar | undefined> => {
  const previousCalendar = await getPreviousCalendar(new Date())

  const bars = await arrayFromAsyncIterable(
    getBarsBetween(marketDataSource, {
      symbol,
      start: previousCalendar.date,
      end: previousCalendar.date,
      timeframe: '1Day',
    }),
  )

  return last(bars)
}
