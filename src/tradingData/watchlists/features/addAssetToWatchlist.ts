import { postTradeData } from '@/tradingData/http'
import {
  AddAssetToWatchlistArgs,
  Watchlist,
} from '@/tradingData/watchlists/types'

/**
 * Appends an asset to a watchlist.
 * @group Trading Data
 * @category Watchlists
 * @param {AddAssetToWatchlistArgs} args
 * @example
 * ```ts
 * const watchlist = await addAssetToWatchlist({
 *   watchlistId: 'b28f4066-5c6d-479b-a2af-85dc1a8f16fb',
 *   symbol: 'AAPL',
 * })
 * ```
 */
export const addAssetToWatchlist = async (args: AddAssetToWatchlistArgs) => {
  const httpResponse = await postTradeData<Watchlist>(
    `/watchlists/${args.watchlistId}`,
    undefined,
    {
      symbol: args.symbol,
    },
  )

  if (httpResponse.ok) {
    return httpResponse.data
  } else {
    throw new Error(httpResponse.message)
  }
}
