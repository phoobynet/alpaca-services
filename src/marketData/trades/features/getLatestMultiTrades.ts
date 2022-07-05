import { Trade } from '../types'
import { MarketDataFeed, MarketDataSource } from '../../types'
import { getMarketDataPagedMultiObject } from '../../http'
import { cleanSymbol } from '../../../helpers'
import { cleanLatestMultiTrades } from '../helpers'

export type LatestMultiTradesArgs = {
  symbols: string[]
  feed: MarketDataFeed
}

export const getLatestMultiTrades = async (
  marketDataSource: MarketDataSource,
  args: LatestMultiTradesArgs,
): Promise<Record<string, Trade>> => {
  const { symbols, feed } = args

  const queryParams: Record<string, string> = {
    symbols: symbols.map(cleanSymbol).join(','),
    feed: feed,
  }
  const result = await getMarketDataPagedMultiObject(
    marketDataSource,
    '/trades/latest',
    queryParams,
  )

  return cleanLatestMultiTrades(result)
}
