import { UpdateWatchlistArgs, Watchlist } from '../types'
import { putTradeData } from '../../http'
import { cleanSymbol, HttpClientError } from '../../../common'

export const updateWatchlist = async (
  args: UpdateWatchlistArgs,
): Promise<Watchlist> => {
  const queryParams: Record<string, string> = {}

  if (args.name) {
    queryParams.name = args.name
  }

  if (args.symbols?.length) {
    queryParams.symbols = args.symbols.map(cleanSymbol).join(',')
  }

  try {
    return await putTradeData<Watchlist>(
      `/watchlists/${args.watchlistId}`,
      queryParams,
    )
  } catch (err) {
    if (err instanceof HttpClientError) {
      if (err.statusCode === 404) {
        throw new Error(
          'The requested watchlist is not found, or one of the symbol is not found in the assets',
        )
      } else if (err.statusCode === 422) {
        throw new Error('Some parameters are not valid')
      }
    }

    throw err
  }
}
