import { MarketDataSource } from '@/marketData/types'
import { Bar, BarsBetweenArgs, getBarsBetween } from '@/marketData'
import { IntradayBarsArgs } from '@/marketData/bars/types'
import { toUtcDateRange } from '@/helpers'
import { getCalendarFor } from '@/tradingData'

export const getIntradayBars = async (
  marketDataSource: MarketDataSource,
  args: IntradayBarsArgs,
): Promise<AsyncIterable<Bar>> => {
  let barsBetweenArgs: BarsBetweenArgs

  if (marketDataSource.type === 'crypto') {
    const [start, end] = toUtcDateRange(args.date)
    barsBetweenArgs = {
      symbol: args.symbol,
      start,
      end,
      exchanges: args.exchanges,
      timeframe: args.timeframe || '1Min',
    }
  } else {
    const calendar = await getCalendarFor(args.date)

    console.log(calendar)

    if (!calendar) {
      return {
        [Symbol.asyncIterator]() {
          return {
            next() {
              return Promise.resolve({
                value: undefined,
                done: true,
              })
            },

            return() {
              return Promise.resolve({
                value: undefined,
                done: true,
              })
            },
          }
        },
      }
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
