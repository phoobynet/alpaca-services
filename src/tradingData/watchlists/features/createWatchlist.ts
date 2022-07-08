import { Watchlist } from '../types'
import { postTradeData } from '../../http'
import { CreateWatchlistArgs } from '../types'

export const createWatchlist = async (
  args: CreateWatchlistArgs,
): Promise<Watchlist> => {
  const data: Record<string, unknown> = {
    name: args.name,
    symbols: args.symbols,
  }

  const httpResponse = await postTradeData<Watchlist>('/watchlists', {}, data)

  if (httpResponse.ok) {
    return httpResponse.data as Watchlist
  } else {
    throw new Error(httpResponse.message)
  }
}
