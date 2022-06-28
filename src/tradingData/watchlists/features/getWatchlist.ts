import { Watchlist } from '../types'
import { getTradeHttpClient } from '../../http'

export const getWatchlist = async (
  id: string,
): Promise<Watchlist | undefined> => {
  return getTradeHttpClient().get<Watchlist>(`/watchlists/${id}`)
}
