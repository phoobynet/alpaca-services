import { getTradeHttpClient } from '../../http'
import { updateWatchlist, UpdateWatchlistArgs } from './updateWatchlist'
import { HttpClient, HttpClientError } from '../../../common'

jest.mock('../../http')

const getTradeHttpClientMock = getTradeHttpClient as jest.Mock<HttpClient>

describe('updateWatchlist', () => {
  const putFn = jest.fn()
  beforeEach(() => {
    getTradeHttpClientMock.mockImplementation(() => {
      return {
        post: jest.fn(),
        get: jest.fn(),
        put: putFn,
        delete: jest.fn(),
      }
    })
  })

  afterEach(() => {
    putFn.mockClear()
    getTradeHttpClientMock.mockClear()
  })

  it('update a watchlist using both the name and symbols', async () => {
    const args: UpdateWatchlistArgs = {
      watchlistId: '123',
      name: 'foo',
      symbols: ['AAPL', 'MSFT'],
    }

    await updateWatchlist(args)

    expect(putFn).toHaveBeenCalledWith(`/watchlists/${args.watchlistId}`, {
      name: 'foo',
      symbols: 'AAPL,MSFT',
    })
  })

  it('update a watchlist name', async () => {
    const args: UpdateWatchlistArgs = {
      watchlistId: '123',
      name: 'foo',
    }

    await updateWatchlist(args)

    expect(putFn).toHaveBeenCalledWith(`/watchlists/${args.watchlistId}`, {
      name: 'foo',
    })
  })

  it('update a watchlists symbols', async () => {
    const args: UpdateWatchlistArgs = {
      watchlistId: '123',
      symbols: ['AAPL', 'msft'],
    }

    await updateWatchlist(args)

    expect(putFn).toHaveBeenCalledWith(`/watchlists/${args.watchlistId}`, {
      symbols: 'AAPL,MSFT',
    })
  })
})

describe('alpaca error handling', () => {
  beforeEach(() => {
    getTradeHttpClientMock.mockClear()
  })

  it('Watchlist name is not unique, or some parameters are not valid', async () => {
    getTradeHttpClientMock.mockImplementationOnce(() => ({
      post: jest.fn(),
      get: jest.fn(),
      put: jest
        .fn()
        .mockRejectedValueOnce(
          new HttpClientError('some sort of error', '/watchlists', 422),
        ),
      delete: jest.fn(),
    }))
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
    getTradeHttpClientMock.mockImplementationOnce(() => ({
      post: jest.fn(),
      get: jest.fn(),
      put: jest
        .fn()
        .mockRejectedValueOnce(
          new HttpClientError('some other error', '/watchlists', 404),
        ),
      delete: jest.fn(),
    }))
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
