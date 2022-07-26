import { Calendar } from '@/tradingData'
import {
  Bar,
  BarsBetweenArgs,
  getBarsBetween,
  usEquitySource,
} from '@/marketData'

/**
 * Only applies to US equities so no source is required.
 * @group Market Data
 * @category Bars
 * @param calendar
 * @param symbol
 *
 * @example
 * ```ts
 * const calendar: Calendar = await getPreviousCalendar()
 *
 * for await (const bar of getIntradayBarsForCalendar(calendar, 'AAPL')) {
 *   console.log(bar)
 * }
 * ```
 */
export const getIntradayBarsForCalendar = (
  calendar: Calendar,
  symbol: string,
): AsyncIterable<Bar> => {
  const args: BarsBetweenArgs = {
    symbol,
    start: calendar.session_open,
    end: calendar.session_close,
    timeframe: '1Min',
  }

  return getBarsBetween(usEquitySource, args)
}
