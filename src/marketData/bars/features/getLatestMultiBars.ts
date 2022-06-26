import { Bar } from '../types'
import { MarketDataSource } from '../../types'
import { getMarketDataPagedMultiArray } from '../../http'
import { cleanSymbol } from '../../../common'
import { cleanMultiBars } from '../helpers'
import z from 'zod'

export type LatestMultiBarsArgs = {
  symbols: string[]
  feed: 'iex' | 'otc' | 'sip'
}

const Validation = z.object({
  symbols: z.array(z.string()).nonempty('symbols is required'),
  feed: z.enum(['iex', 'otc', 'sip']),
})

export const getLatestMultiBars = async (
  marketDataSource: MarketDataSource,
  args: LatestMultiBarsArgs,
): Promise<Record<string, Bar[]>> => {
  const { symbols, feed } = Validation.parse(args)

  const queryParams: Record<string, string> = {
    symbols: symbols.map(cleanSymbol).join(','),
    feed: feed,
  }
  const result = await getMarketDataPagedMultiArray(
    marketDataSource,
    '/bars/latest',
    queryParams,
  )

  return cleanMultiBars(result)
}
