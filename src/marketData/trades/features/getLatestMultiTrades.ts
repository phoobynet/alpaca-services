import { Trade } from '../types'
import { MarketDataFeed, MarketDataSource } from '../../types'
import { getMarketDataPagedMultiObject } from '../../http'
import { cleanSymbol } from '../../../common'
import z from 'zod'
import { cleanLatestMultiTrades } from '../helpers'

export type LatestMultiTradesArgs = {
  symbols: string[]
  feed: MarketDataFeed
}

const Validation = z.object({
  symbols: z
    .array(
      z.string().nonempty({
        message: 'symbol cannot be empty',
      }),
    )
    .nonempty('symbols is required'),
  feed: z.nativeEnum(MarketDataFeed),
})

export const getLatestMultiTrades = async (
  marketDataSource: MarketDataSource,
  args: LatestMultiTradesArgs,
): Promise<Record<string, Trade>> => {
  const { symbols, feed } = Validation.parse(args)

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