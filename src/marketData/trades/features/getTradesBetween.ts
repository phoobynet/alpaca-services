import { MarketDataSource } from '@/marketData/types'
import { Trade, TradeBetweenArgs } from '@/marketData/trades/types'
import { getMarketDataIterator } from '@/marketData/http'
import { cleanTrade } from '@/marketData/trades/helpers'

const DEFAULT_ABSOLUTE_LIMIT = 1_000

/**
 * @group Market Data
 * @category Trades
 * @param {MarketDataSource} marketDataSource - {@link cryptoMarketDataSource} or {@link stockMarketDataSource}
 * @param {TradeBetweenArgs} args
 */
export const getTradesBetween = (
  marketDataSource: MarketDataSource,
  args: TradeBetweenArgs,
): AsyncIterable<Trade> => {
  const queryParams: Record<string, string> = {
    start: args.start.toISOString(),
    end: args.end.toISOString(),
  }

  if (args.exchanges?.length) {
    queryParams.exchanges = args.exchanges.join(',')
  }

  return getMarketDataIterator<Trade>(marketDataSource, {
    url: `/${args.symbol}/trades`,
    queryParams,
    absoluteLimit: args.absoluteLimit || DEFAULT_ABSOLUTE_LIMIT,
    tidy: (trade) => cleanTrade(trade, args.symbol),
  })
}
