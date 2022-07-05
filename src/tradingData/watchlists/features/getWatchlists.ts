import { Watchlist } from '../types'
import { getTradeData } from '../../http'

export const getWatchlists = async (): Promise<Watchlist[]> => {
  const httpResponse = await getTradeData<Watchlist[]>('/watchlists')

  if (httpResponse.ok) {
    return httpResponse.data || []
  } else {
    throw new Error(httpResponse.message)
  }
}
