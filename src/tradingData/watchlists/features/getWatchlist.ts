import { Watchlist } from '../types'
import { getTradeData } from '../../http'

export const getWatchlist = async (
  id: string,
): Promise<Watchlist | undefined> => {
  return getTradeData<Watchlist>(`/watchlists/${id}`)
}
