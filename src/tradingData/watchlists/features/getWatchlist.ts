import { Watchlist } from '../types'
import { getTradeData } from '../../http'

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
