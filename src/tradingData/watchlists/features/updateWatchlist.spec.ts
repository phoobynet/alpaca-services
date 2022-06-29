import { putTradeData } from '../../http'
import { updateWatchlist, UpdateWatchlistArgs } from './updateWatchlist'
import { HttpClientError } from '../../../common'

jest.mock('../../http')

describe('updateWatchlist', () => {
  describe('URL parameters check', () => {
    it('update a watchlist using both the name and symbols', async () => {
      const args: UpdateWatchlistArgs = {
        watchlistId: '123',
        name: 'foo',
        symbols: ['AAPL', 'MSFT'],
      }

      await updateWatchlist(args)

      expect(putTradeData).toHaveBeenCalledWith(
        `/watchlists/${args.watchlistId}`,
        {
          name: 'foo',
          symbols: 'AAPL,MSFT',
        },
      )
    })

    it('update a watchlist name', async () => {
      const args: UpdateWatchlistArgs = {
        watchlistId: '123',
        name: 'foo',
      }

      await updateWatchlist(args)

      expect(putTradeData).toHaveBeenCalledWith(
        `/watchlists/${args.watchlistId}`,
        {
          name: 'foo',
        },
      )
    })

    it('update a watchlists symbols', async () => {
      const args: UpdateWatchlistArgs = {
        watchlistId: '123',
        symbols: ['AAPL', 'msft'],
      }

      await updateWatchlist(args)

      expect(putTradeData).toHaveBeenCalledWith(
        `/watchlists/${args.watchlistId}`,
        {
          symbols: 'AAPL,MSFT',
        },
      )
    })
  })

  describe('alpaca error handling', () => {
    it('Watchlist name is not unique, or some parameters are not valid', async () => {
      ;(putTradeData as jest.Mock).mockRejectedValue(
        new HttpClientError('some sort of error', '/watchlists', 422),
      )

      const args: UpdateWatchlistArgs = {
        watchlistId: '123',
        name: 'foo',
        symbols: ['AAPL', 'MSFT'],
      }

      await expect(() => updateWatchlist(args)).rejects.toThrowError(
        'Some parameters are not valid',
      )
    })

    it('One of the symbol is not found in the assets', async () => {
      ;(putTradeData as jest.Mock).mockRejectedValue(
        new HttpClientError('some sort of error', '/watchlists', 404),
      )

      const args: UpdateWatchlistArgs = {
        watchlistId: '123',
        name: 'foo',
        symbols: ['AAPL', 'MSFT'],
      }

      await expect(() => updateWatchlist(args)).rejects.toThrowError(
        'The requested watchlist is not found, or one of the symbol is not found in the assets',
      )
    })
  })
})
