import { MarketDataSource } from '@/marketData/types'
import { Bar, BarsBetweenArgs, getBarsBetween } from '@/marketData'
import { IntradayBarsArgs } from '@/marketData/bars/types'
import { emptyAsyncIterator, toUtcDayRange } from '@/helpers'
import { getCalendarFor } from '@/tradingData'

export const getIntradayBars = async (
  marketDataSource: MarketDataSource,
  args: IntradayBarsArgs,
): Promise<AsyncIterable<Bar>> => {
  let barsBetweenArgs: BarsBetweenArgs

  if (marketDataSource.type === 'crypto') {
    const [start, end] = toUtcDayRange(args.date)
    barsBetweenArgs = {
      symbol: args.symbol,
      start,
      end,
      exchanges: args.exchanges,
      timeframe: args.timeframe || '1Min',
    }
  } else {
    const calendar = await getCalendarFor(args.date)

    if (!calendar) {
      return emptyAsyncIterator<Bar>()
    }

    barsBetweenArgs = {
      symbol: args.symbol,
      start: calendar?.session_open,
      end: calendar?.session_close,
      feed: args.feed,
      timeframe: args.timeframe || '1Min',
    }
  }

  return getBarsBetween(marketDataSource, barsBetweenArgs)
}
