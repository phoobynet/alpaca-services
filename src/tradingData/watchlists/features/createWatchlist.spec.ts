import { postTradeData } from '../../http'
import { HttpClientError } from '../../../common'
import { createWatchlist, CreateWatchlistArgs } from './createWatchlist'

jest.mock('../../http')

describe('createWatchlist', () => {
  describe('URL parameters check', () => {
    it('should send the correct URLs and query parameters', async () => {
      const args: CreateWatchlistArgs = {
        name: 'foo',
        symbols: ['AAPL', 'MSFT'],
      }

      await createWatchlist(args)

      expect(postTradeData).toHaveBeenCalledWith('/watchlists', {
        name: 'foo',
        symbols: 'AAPL,MSFT',
      })
    })
  })

  describe('alpaca error handling', () => {
    it('Watchlist name is not unique, or some parameters are not valid', async () => {
      ;(postTradeData as jest.Mock).mockRejectedValueOnce(
        new HttpClientError('some sort of error', '/watchlists', 422),
      )
      const args: CreateWatchlistArgs = {
        name: 'foo',
        symbols: ['AAPL', 'MSFT'],
      }

      await expect(() => createWatchlist(args)).rejects.toThrowError(
        'Watchlist name is not unique, or some parameters are not valid',
      )
    })

    it('One of the symbol is not found in the assets', async () => {
      ;(postTradeData as jest.Mock).mockRejectedValueOnce(
        new HttpClientError('some sort of error', '/watchlists', 404),
      )

      const args: CreateWatchlistArgs = {
        name: 'foo',
        symbols: ['AAPL', 'MSFT'],
      }

      await expect(() => createWatchlist(args)).rejects.toThrowError(
        'One of the symbol is not found in the assets',
      )
    })
  })
})
