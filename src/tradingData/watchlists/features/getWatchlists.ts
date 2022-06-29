import { Watchlist } from '../types'
import { getTradeData } from '../../http'

export const getWatchlists = async (): Promise<Watchlist[]> => {
  return getTradeData<Watchlist[]>('/watchlists')
}
