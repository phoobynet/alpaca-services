import { Watchlist } from '../types'
import { getTradeHttpClient } from '../../http'
import { cleanSymbol, HttpClientError } from '../../../common'

export type CreateWatchlistArgs = {
  name: string
  symbols: string[]
}

export const createWatchlist = async (
  args: CreateWatchlistArgs,
): Promise<Watchlist> => {
  const queryParams: Record<string, string> = {
    name: args.name,
    symbols: args.symbols.map(cleanSymbol).join(','),
  }

  try {
    return await getTradeHttpClient().post<Watchlist>(
      '/watchlists',
      queryParams,
    )
  } catch (err) {
    if (err instanceof HttpClientError) {
      if (err.statusCode === 404) {
        throw new Error('One of the symbol is not found in the assets')
      } else if (err.statusCode === 422) {
        throw new Error(
          'Watchlist name is not unique, or some parameters are not valid',
        )
      }
    }

    throw err
  }
}
