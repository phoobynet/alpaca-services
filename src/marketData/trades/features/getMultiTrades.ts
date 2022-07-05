import { MarketDataSource } from '../../types'
import { Trade } from '../types'
import { getMarketDataPagedMultiArray } from '../../http'
import { cleanSymbol } from '../../../helpers'
import { cleanMultiTrades } from '../helpers'

export type MultiTradesArgs = {
  symbols: string[]
  start: Date
  end: Date
  // absolute limit per symbol (max: 1_000)
  absoluteLimit: number
}

export const getMultiTrades = async (
  marketDataSource: MarketDataSource,
  args: MultiTradesArgs,
): Promise<Record<string, Trade[]>> => {
  const { symbols, start, end, absoluteLimit } = args

  const queryParams: Record<string, string> = {
    symbols: symbols.map(cleanSymbol).join(','),
    start: start.toISOString(),
    end: end.toISOString(),
  }

  const data = await getMarketDataPagedMultiArray(
    marketDataSource,
    '/trades',
    queryParams,
    absoluteLimit,
  )

  return cleanMultiTrades(data)
}
