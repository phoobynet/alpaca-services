import { postTradeData } from '../../http'
import { AddAssetToWatchlistArgs, Watchlist } from '../types'
import { cleanSymbol } from '../../../helpers'

/**
 * Appends an asset to a watchlist.
 * @group Trading Data
 * @category Watchlists
 * @param args
 */
export const addAssetToWatchlist = async (args: AddAssetToWatchlistArgs) => {
  const symbol = cleanSymbol(args.symbol)

  const httpResponse = await postTradeData<Watchlist>(
    `/watchlists/${args.watchlistId}`,
    undefined,
    {
      symbol,
    },
  )

  if (httpResponse.ok) {
    return httpResponse.data
  } else {
    throw new Error(httpResponse.message)
  }
}
