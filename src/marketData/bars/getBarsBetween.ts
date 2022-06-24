import { cleanBar, isValidTimeframe } from './helpers'
import { getMarketDataIterator } from '../http'
import { Bar } from './types'
import { cleanTimestamp } from '../helpers'
import { flow } from 'lodash'
import { cleanSymbol } from '../helpers'

export type BarsBetweenArgs = {
  symbol: string
  start: Date
  end: Date
  timeframe: string
  absoluteLimit?: number
}

const DEFAULT_ABSOLUTE_LIMIT = 1_000

export const getBarsBetween = (args: BarsBetweenArgs): AsyncIterable<Bar> => {
  if (!isValidTimeframe(args.timeframe)) {
    throw new Error('Invalid timeframe')
  }

  const symbol = cleanSymbol(args.symbol)

  const url = `/stocks/${args.symbol}/bars`
  const queryParams: Record<string, string> = {
    start: args.start.toISOString(),
    end: args.end.toISOString(),
    timeframe: args.timeframe,
  }

  return getMarketDataIterator<Bar>({
    url,
    queryParams,
    absoluteLimit: args.absoluteLimit || DEFAULT_ABSOLUTE_LIMIT,
    tidy: (item) => flow((bar) => cleanBar(bar, symbol), cleanTimestamp)(item),
  })
}
