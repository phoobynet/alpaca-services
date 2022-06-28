import { Watchlist } from '../types'
import { getTradeHttpClient } from '../../http'

export const getWatchlists = async (): Promise<Watchlist[]> => {
  return getTradeHttpClient().get<Watchlist[]>('/watchlists')
}
