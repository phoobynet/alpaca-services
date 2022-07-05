import { Watchlist } from '../types'
import { postTradeData } from '../../http'
import { cleanSymbol } from '../../../helpers'
import { CreateWatchlistArgs } from '../types'

export const createWatchlist = async (
  args: CreateWatchlistArgs,
): Promise<Watchlist> => {
  const queryParams: Record<string, string> = {
    name: args.name,
    symbols: args.symbols.map(cleanSymbol).join(','),
  }

  const httpResponse = await postTradeData<Watchlist>(
    '/watchlists',
    queryParams,
  )

  if (httpResponse.ok) {
    return httpResponse.data as Watchlist
  } else {
    throw new Error(httpResponse.message)
  }
}
