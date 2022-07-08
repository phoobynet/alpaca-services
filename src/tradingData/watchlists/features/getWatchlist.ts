import { Watchlist } from '@/tradingData/watchlists/types'
import { getTradeData } from '@/tradingData/http'

/**
 * @group Trading Data
 * @category Watchlists
 * @param {string} id
 * @example
 * ```ts
 * const watchlist = await getWatchlist('b28f4066-5c6d-479b-a2af-85dc1a8f16fb')
 * ```
 */
export const getWatchlist = async (
  id: string,
): Promise<Watchlist | undefined> => {
  const httpResponse = await getTradeData<Watchlist>(`/watchlists/${id}`)

  if (httpResponse.ok) {
    return httpResponse.data
  } else {
    throw new Error(httpResponse.message)
  }
}
