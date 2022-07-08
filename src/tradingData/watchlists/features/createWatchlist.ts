import { Watchlist, CreateWatchlistArgs } from '@/tradingData/watchlists/types'
import { postTradeData } from '@/tradingData/http'

/**
 * @group Trading Data
 * @category Watchlists
 * @param {CreateWatchlistArgs} args
 * @example
 * ```ts
 * const watchlist = await createWatchlist({
 *   name: 'My Watchlist',
 *   // optional
 *   symbols: ['AAPL', 'MSFT'],
 * })
 * ```
 */
export const createWatchlist = async (
  args: CreateWatchlistArgs,
): Promise<Watchlist> => {
  const data: Record<string, unknown> = {
    name: args.name,
    symbols: args.symbols.join(','),
  }

  const httpResponse = await postTradeData<Watchlist>('/watchlists', {}, data)

  if (httpResponse.ok) {
    return httpResponse.data as Watchlist
  } else {
    throw new Error(httpResponse.message)
  }
}
