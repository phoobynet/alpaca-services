import { getTradeHttpClient } from '../../http'
import { HttpClientError } from '../../../common'
import {
  addAssetToWatchlist,
  AddAssetToWatchlistArgs,
} from './addAssetToWatchlist'

jest.mock('../../http', () => ({
  __esModule: true,
  getTradeHttpClient: jest.fn().mockReturnValue({
    post: jest.fn(),
    get: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
  }),
}))

describe('addAssetToWatchlist', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  const mockHttpClient = getTradeHttpClient()

  const postFn = jest.fn()
  mockHttpClient.post = postFn

  it('should send the correct URLs and query parameters', async () => {
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
  it('The requested watchlist is not found, or the symbol is not found in the assets', async () => {
    const mockHttpClient = getTradeHttpClient()

    mockHttpClient.post = jest
      .fn()
      .mockRejectedValueOnce(
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
    const mockHttpClient = getTradeHttpClient()
    mockHttpClient.post = jest
      .fn()
      .mockRejectedValueOnce(
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
