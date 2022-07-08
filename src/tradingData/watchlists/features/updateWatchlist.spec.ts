import { putTradeData } from '../../http'
import { UpdateWatchlistArgs } from '../types'

const { updateWatchlist } = jest.requireActual('./updateWatchlist')

const putTradeDataMock = putTradeData as jest.Mock

describe('updateWatchlist', () => {
  describe('URL parameters check', () => {
    test('update a watchlist using both the name and symbols', async () => {
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

    test('update a watchlist name', async () => {
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

    test('update a watchlists symbols', async () => {
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
    test('Watchlist name is not unique, or some parameters are not valid', async () => {
      putTradeDataMock.mockRejectedValue(new Error('some sort of error'))

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
      putTradeDataMock.mockRejectedValue(new Error('some sort of error'))

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
