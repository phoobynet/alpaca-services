import { Trade, TradeBetweenArgs } from '@/marketData/trades/types'
import { getMarketDataIterator } from '@/marketData/http'
import { cleanTrade } from '@/marketData/trades/helpers'
import { cleanSymbol } from '@/marketData/helpers'

const DEFAULT_ABSOLUTE_LIMIT = 1_000

/**
 * @group Market Data
 * @category Trades
 * @param {TradeBetweenArgs} args
 */
export const getTradesBetween = (
  args: TradeBetweenArgs,
): AsyncIterable<Trade> => {
  const symbol = cleanSymbol(args.symbol)
  const isCryptoPair = symbol.includes('/')

  const queryParams: Record<string, string> = {
    start: args.start.toISOString(),
    end: args.end.toISOString(),
  }

  if (args.feed) {
    queryParams.feed = args.feed
  }

  if (isCryptoPair) {
    queryParams.symbols = symbol
  }

  return getMarketDataIterator<Trade>(symbol, {
    url: isCryptoPair ? '/trades' : `/${args.symbol}/trades`,
    queryParams,
    absoluteLimit: args.absoluteLimit || DEFAULT_ABSOLUTE_LIMIT,
    tidy: (trade) => cleanTrade(trade, args.symbol),
  })
}
