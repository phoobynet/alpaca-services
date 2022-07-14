import { MarketDataFeed, MarketDataSource } from '@/marketData/types'
import { Bar, BarsBetweenArgs, getBarsBetween } from '@/marketData'
import { startOfDay } from 'date-fns'

export type IntradayBarsArgs = {
  symbol: string
  date: Date
  exchanges?: string[]
  feed?: MarketDataFeed
  timeframe?: string
}

export const getIntradayBars = (
  marketDataSource: MarketDataSource,
  args: IntradayBarsArgs,
): AsyncIterable<Bar> => {
  let exchanges: string[] | undefined
  let feed: MarketDataFeed | undefined
  let absoluteLimit = 1_440

  if (marketDataSource.type === 'crypto') {
    exchanges = args.exchanges || []
  } else {
    feed = args.feed
    absoluteLimit = 960
  }

  const barsBetweenArgs: BarsBetweenArgs = {
    symbol: args.symbol,
    start: startOfDay(args.date),
    timeframe: args.timeframe || '1Min',
    exchanges,
    feed,
    absoluteLimit,
  }

  return getBarsBetween(marketDataSource, barsBetweenArgs)
}
