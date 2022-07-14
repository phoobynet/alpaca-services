import { Watchlist } from '@/tradingData/watchlists/types'
import { getTradeData } from '@/tradingData/http'

/**
 * @group Trading Data
 * @category Watchlists
 * @example
 * ```ts
 * const watchlists = await getWatchlists()
 * ```
 */
export const getWatchlists = async (): Promise<Watchlist[]> => {
  const httpResponse = await getTradeData<Watchlist[]>('/watchlists')

  if (httpResponse.ok) {
    return httpResponse.data || []
  } else {
    throw new Error(httpResponse.message)
  }
}
