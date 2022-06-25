import { cleanBar, isValidTimeframe } from '../helpers'
import { getMarketDataIterator } from '../../http'
import { Bar } from '../types'
import { cleanTimestamp } from '../../helpers'
import { flow } from 'lodash'
import { cleanSymbol } from '../../../common'
import { MarketDataSource } from '../../types'

export type BarsBetweenArgs = {
  symbol: string
  start: Date
  end: Date
  timeframe: string
  absoluteLimit?: number
  exchange?: string
}

const DEFAULT_ABSOLUTE_LIMIT = 1_000

export const getBarsBetween = (
  marketDataSource: MarketDataSource,
  args: BarsBetweenArgs,
): AsyncIterable<Bar> => {
  if (!isValidTimeframe(args.timeframe)) {
    throw new Error('Invalid timeframe')
  }

  if (marketDataSource.type === 'crypto' && !args.exchange) {
    throw new Error('Exchange is required for crypto market data')
  }

  const symbol = cleanSymbol(args.symbol)

  const url = `/${args.symbol}/bars`
  const queryParams: Record<string, string> = {
    start: args.start.toISOString(),
    end: args.end.toISOString(),
    timeframe: args.timeframe,
  }

  return getMarketDataIterator<Bar>(marketDataSource, {
    url,
    queryParams,
    absoluteLimit: args.absoluteLimit || DEFAULT_ABSOLUTE_LIMIT,
    tidy: (item) => flow((bar) => cleanBar(bar, symbol), cleanTimestamp)(item),
  })
}
