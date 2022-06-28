import { getTradeHttpClient } from '../../http'
import { HttpClient, HttpClientError } from '../../../common'
import {
  addAssetToWatchlist,
  AddAssetToWatchlistArgs,
} from './addAssetToWatchlist'

jest.mock('../../http')

const getTradeHttpClientMock = getTradeHttpClient as jest.Mock<HttpClient>

describe('addAssetToWatchlist', () => {
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

  it('should', async () => {
    const args: AddAssetToWatchlistArgs = {
      watchlistId: '123',
      symbol: 'AAPL',
    }

    await addAssetToWatchlist(args)
    expect(postFn).toHaveBeenCalledWith('/watchlists/123', undefined, {
      symbol: 'AAPL',
    })
  })
})

describe('alpaca error handling', () => {
  beforeEach(() => {
    getTradeHttpClientMock.mockClear()
  })

  it('The requested watchlist is not found, or the symbol is not found in the assets', async () => {
    getTradeHttpClientMock.mockImplementationOnce(() => ({
      post: jest
        .fn()
        .mockRejectedValueOnce(
          new HttpClientError('some sort of error', '/watchlists', 404),
        ),
      get: jest.fn(),
      put: jest.fn(),
      delete: jest.fn(),
    }))
    const args: AddAssetToWatchlistArgs = {
      watchlistId: '123',
      symbol: 'AAPL',
    }

    await expect(() => addAssetToWatchlist(args)).rejects.toThrowError(
      'The requested watchlist is not found, or the symbol is not found in the assets',
    )
  })

  it('Some parameters are not valid', async () => {
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
    const args: AddAssetToWatchlistArgs = {
      watchlistId: '123',
      symbol: 'AAPL',
    }

    await expect(() => addAssetToWatchlist(args)).rejects.toThrowError(
      'Some parameters are not valid',
    )
  })
})
