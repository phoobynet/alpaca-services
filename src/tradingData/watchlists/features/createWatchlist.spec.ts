import { getTradeHttpClient } from '../../http'
import { createWatchlist, CreateWatchlistArgs } from './createWatchlist'
import { HttpClient, HttpClientError } from '../../../common'

jest.mock('../../http')

const getTradeHttpClientMock = getTradeHttpClient as jest.Mock<HttpClient>

describe('createWatchlist', () => {
  const postFn = jest.fn()
  getTradeHttpClientMock.mockImplementation(() => {
    return {
      post: postFn,
      get: jest.fn(),
      put: jest.fn(),
      delete: jest.fn(),
    }
  })
  beforeEach(() => {
    getTradeHttpClientMock.mockClear()
  })

  it('create a watchlist', async () => {
    const args: CreateWatchlistArgs = {
      name: 'foo',
      symbols: ['AAPL', 'MSFT'],
    }

    await createWatchlist(args)

    expect(postFn).toHaveBeenCalledWith('/watchlists', {
      name: 'foo',
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
      post: jest
        .fn()
        .mockRejectedValueOnce(
          new HttpClientError('some sort of error', '/watchlists', 422),
        ),
      get: jest.fn(),
      put: jest.fn(),
      delete: jest.fn(),
    }))
    const args: CreateWatchlistArgs = {
      name: 'foo',
      symbols: ['AAPL', 'MSFT'],
    }

    await expect(() => createWatchlist(args)).rejects.toThrowError(
      'Watchlist name is not unique, or some parameters are not valid',
    )
  })

  it('One of the symbol is not found in the assets', async () => {
    getTradeHttpClientMock.mockImplementationOnce(() => ({
      post: jest
        .fn()
        .mockRejectedValueOnce(
          new HttpClientError('some other error', '/watchlists', 404),
        ),
      get: jest.fn(),
      put: jest.fn(),
      delete: jest.fn(),
    }))
    const args: CreateWatchlistArgs = {
      name: 'foo',
      symbols: ['AAPL', 'MSFT'],
    }

    await expect(() => createWatchlist(args)).rejects.toThrowError(
      'One of the symbol is not found in the assets',
    )
  })
})
