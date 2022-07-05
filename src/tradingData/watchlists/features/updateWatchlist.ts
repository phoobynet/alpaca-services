import { UpdateWatchlistArgs, Watchlist } from '../types'
import { putTradeData } from '../../http'
import { cleanSymbol } from '../../../helpers'

export const updateWatchlist = async (
  args: UpdateWatchlistArgs,
): Promise<Watchlist> => {
  const queryParams: Record<string, string> = {}

  if (args.name) {
    queryParams.name = args.name
  }

  if (args.symbols?.length) {
    queryParams.symbols = args.symbols.map(cleanSymbol).join(',')
  }

  const httpResponse = await putTradeData<Watchlist>(
    `/watchlists/${args.watchlistId}`,
    queryParams,
  )

  if (httpResponse.ok) {
    return httpResponse.data as Watchlist
  } else {
    throw new Error(httpResponse.message)
  }
}
