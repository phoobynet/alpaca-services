import { postTradeData } from '../../http'

const { createWatchlist } = jest.requireActual('./createWatchlist')
const { HttpClientError } = jest.requireActual('../../../http')

const postTradeDataMock = postTradeData as jest.Mock

describe('createWatchlist', () => {
  describe('URL parameters check', () => {
    test('should send the correct URLs and query parameters', async () => {
      await createWatchlist({
        name: 'foo',
        symbols: ['AAPL', 'MSFT'],
      })

      expect(postTradeDataMock).toHaveBeenCalledWith('/watchlists', {
        name: 'foo',
        symbols: 'AAPL,MSFT',
      })
    })
  })

  describe('alpaca error handling', () => {
    test('Watchlist name is not unique, or some parameters are not valid', async () => {
      postTradeDataMock.mockRejectedValueOnce(
        new HttpClientError('some sort of error', '/watchlists', 422),
      )

      await expect(
        async () =>
          await createWatchlist({
            name: 'foo',
            symbols: ['AAPL', 'MSFT'],
          }),
      ).rejects.toThrowError(
        'Watchlist name is not unique, or some parameters are not valid',
      )
    })

    it('One of the symbol is not found in the assets', async () => {
      postTradeDataMock.mockRejectedValueOnce(
        new HttpClientError('some sort of error', '/watchlists', 404),
      )

      await expect(
        async () =>
          await createWatchlist({
            name: 'foo',
            symbols: ['AAPL', 'MSFT'],
          }),
      ).rejects.toThrowError('One of the symbol is not found in the assets')
    })
  })
})
