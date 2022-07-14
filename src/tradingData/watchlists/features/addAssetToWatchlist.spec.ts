import { postTradeData } from '../../http'
import { AddAssetToWatchlistArgs } from '../types'
const { addAssetToWatchlist } = jest.requireActual('./addAssetToWatchlist')
const { HttpClientError } = jest.requireActual('../../../http')
const postTradeDataMock = postTradeData as jest.Mock

describe('addAssetToWatchlist', () => {
  describe('URL parameters check', () => {
    test('should send the correct URLs and query parameters', async () => {
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
    test('The requested watchlist is not found, or the symbol is not found in the assets', async () => {
      if (jest.isMockFunction(HttpClientError)) {
        console.log('poop')
      }

      postTradeDataMock.mockRejectedValueOnce(
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

    test('Some parameters are not valid', async () => {
      const { HttpClientError } = jest.requireActual('../../../common')

      postTradeDataMock.mockRejectedValueOnce(
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
