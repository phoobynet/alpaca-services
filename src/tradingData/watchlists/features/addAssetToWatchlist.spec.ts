import { postTradeData } from '../../http'
import { HttpClientError } from '../../../common'
import {
  addAssetToWatchlist,
  AddAssetToWatchlistArgs,
} from './addAssetToWatchlist'

jest.mock('../../http')

describe('addAssetToWatchlist', () => {
  describe('URL parameters check', () => {
    it('should send the correct URLs and query parameters', async () => {
      const args: AddAssetToWatchlistArgs = {
        watchlistId: '123',
        symbol: 'AAPL',
      }

      await addAssetToWatchlist(args)
      expect(postTradeData).toHaveBeenCalledWith('/watchlists/123', undefined, {
        symbol: 'AAPL',
      })
    })
  })

  describe('alpaca error handling', () => {
    it('The requested watchlist is not found, or the symbol is not found in the assets', async () => {
      ;(postTradeData as jest.Mock).mockRejectedValueOnce(
        new HttpClientError('some sort of error', '/watchlists', 404),
      )

      const args: AddAssetToWatchlistArgs = {
        watchlistId: '123',
        symbol: 'AAPL',
      }

      await expect(() => addAssetToWatchlist(args)).rejects.toThrowError(
        'The requested watchlist is not found, or the symbol is not found in the assets',
      )
    })

    it('Some parameters are not valid', async () => {
      ;(postTradeData as jest.Mock).mockRejectedValueOnce(
        new HttpClientError('some sort of error', '/watchlists', 422),
      )
      const args: AddAssetToWatchlistArgs = {
        watchlistId: '123',
        symbol: 'AAPL',
      }

      await expect(() => addAssetToWatchlist(args)).rejects.toThrowError(
        'Some parameters are not valid',
      )
    })
  })
})
