import { UpdateWatchlistArgs, Watchlist } from '@/tradingData/watchlists/types'
import { putTradeData } from '@/tradingData/http'

/**
 * @group Trading Data
 * @category Watchlists
 * @param {UpdateWatchlistArgs} args
 * @example
 * ```ts
 * const watchlist = await updateWatchlist({
 *   watchlistId: 'b28f4066-5c6d-479b-a2af-85dc1a8f16fb',
 *   // optional
 *   name: 'New name',
 *   // optional 0 replaces the existing symbols
 *   symbol: ['AAPL', 'MSFT'],
 * })
 * ```
 */
export const updateWatchlist = async (
  args: UpdateWatchlistArgs,
): Promise<Watchlist> => {
  const queryParams: Record<string, string> = {}

  if (args.name) {
    queryParams.name = args.name
  }

  if (args.symbols?.length) {
    queryParams.symbols = args.symbols.join(',')
  }

  const httpResponse = await putTradeData<Watchlist>(
    `/watchlists/${args.watchlistId}`,
    queryParams,
  )

  if (httpResponse.ok) {
    return httpResponse.data as Watchlist
  } else {
    throw new Error(httpResponse.message)
  }
}
