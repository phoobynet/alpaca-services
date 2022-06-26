import { Bar } from '../types'
import { MarketDataFeed, MarketDataSource } from '../../types'
import { getMarketDataPagedMultiObject } from '../../http'
import { cleanSymbol } from '../../../common'
import z from 'zod'
import { cleanLatestMultiBars } from '../helpers'

export type LatestMultiBarsArgs = {
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

export const getLatestMultiBars = async (
  marketDataSource: MarketDataSource,
  args: LatestMultiBarsArgs,
): Promise<Record<string, Bar>> => {
  const { symbols, feed } = Validation.parse(args)

  const queryParams: Record<string, string> = {
    symbols: symbols.map(cleanSymbol).join(','),
    feed,
  }
  const result = await getMarketDataPagedMultiObject(
    marketDataSource,
    '/bars/latest',
    queryParams,
  )

  return cleanLatestMultiBars(result)
}
