import { MarketDataSource } from '../../types'
import { Trade } from '../types'
import { cleanSymbol } from '../../../helpers'
import { getMarketDataIterator } from '../../http'
import { cleanTrade } from '../helpers'

const DEFAULT_ABSOLUTE_LIMIT = 1_000

export type TradeBetweenArgs = {
  symbol: string
  start: Date
  end: Date
  absoluteLimit?: number
  exchanges?: string[]
}

export const getTradesBetween = (
  marketDataSource: MarketDataSource,
  args: TradeBetweenArgs,
): AsyncIterable<Trade> => {
  if (marketDataSource.type === 'crypto') {
    if (!args.exchanges || args.exchanges.length === 0) {
      throw new Error('Crypto market data requires at least one exchange')
    }
  }

  const symbol = cleanSymbol(args.symbol)

  const url = `/${args.symbol}/trades`

  const queryParams: Record<string, string> = {
    start: args.start.toISOString(),
    end: args.end.toISOString(),
  }

  if (args.exchanges) {
    queryParams.exchanges = args.exchanges.join(',')
  }

  return getMarketDataIterator<Trade>(marketDataSource, {
    url,
    queryParams,
    absoluteLimit: args.absoluteLimit || DEFAULT_ABSOLUTE_LIMIT,
    tidy: (trade) => cleanTrade(trade, symbol),
  })
}
