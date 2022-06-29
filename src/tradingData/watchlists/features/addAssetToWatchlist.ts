import { postTradeData } from '../../http'
import { Watchlist } from '../types'
import { cleanSymbol, HttpClientError } from '../../../common'

export type AddAssetToWatchlistArgs = {
  watchlistId: string
  symbol: string
}

/**
 * Appends an asset to a watchlist.
 * @param args
 */
export const addAssetToWatchlist = async (args: AddAssetToWatchlistArgs) => {
  try {
    return await postTradeData<Watchlist>(
      `/watchlists/${args.watchlistId}`,
      undefined,
      {
        symbol: cleanSymbol(args.symbol),
      },
    )
  } catch (e) {
    if (e instanceof HttpClientError) {
      if (e.statusCode === 404) {
        throw new Error(
          'The requested watchlist is not found, or the symbol is not found in the assets',
        )
      } else if (e.statusCode === 422) {
        throw new Error('Some parameters are not valid')
      }
    }
  }
}
