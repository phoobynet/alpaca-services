import { Bar, getBarsSince, MarketDataSource } from '@/marketData'
import { Calendar, getAsset } from '@/tradingData'
import { subBusinessDays } from 'date-fns'
import { isCryptoSource } from '@/marketData/helpers'
import { arrayFromAsyncIterable } from '@/helpers'

/**
 * @group Market Data
 * @category Bars
 * @param marketDataSource
 * @param args
 * @example
 * ```typescript
 *  const dailyBar = await getDailyBarFor(usEquitySource, {
 *     symbol: 'AAPL',
 *     date: new Date('2022-08-29'),
 *  })
 * ```
 */
export const getDailyBarFor = async (
  marketDataSource: MarketDataSource,
  args: { symbol: string; date: Date | Calendar },
): Promise<Bar | undefined> => {
  let d: Date

  if (args.date instanceof Date) {
    d = args.date
  } else if ('date' in args.date) {
    d = args.date.date
  } else {
    throw new Error('Cannot establish since date')
  }

  const since = subBusinessDays(d, 3)

  const asset = await getAsset(args.symbol)

  if (!asset) {
    throw new Error(`Asset ${args.symbol} not found`)
  }

  let bars: Bar[] = []

  if (isCryptoSource(marketDataSource)) {
    bars = await arrayFromAsyncIterable(
      getBarsSince(marketDataSource, {
        symbol: asset.symbol,
        since,
        timeframe: '1D',
        exchanges: [asset.exchange],
      }),
    )
  } else {
    bars = await arrayFromAsyncIterable(
      getBarsSince(marketDataSource, {
        symbol: asset.symbol,
        since,
        timeframe: '1D',
      }),
    )
  }

  const datePart = d.toISOString().substring(0, 10)

  return bars.find((bar) => bar.t.substring(0, 10) === datePart)
}
