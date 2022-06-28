import { cryptoMarketDataSource } from './cryptoMarketDataSource'
import { MarketDataClass } from '../types'
import { createHttpClient } from '../../common/http/features/createHttpClient'
import { HttpClient } from '../../common'

jest.mock('../../common/http/features/createHttpClient')
const mockHttpClient = createHttpClient as jest.Mock<HttpClient>
const mockHttpClientGet = jest.fn()

describe('cryptoMarketDataSource', () => {
  beforeEach(() => {
    mockHttpClient.mockClear()
    mockHttpClientGet.mockClear()
    mockHttpClient.mockImplementation(() => {
      return {
        get: mockHttpClientGet,
        post: jest.fn(),
        put: jest.fn(),
        delete: jest.fn(),
      }
    })
  })
  it('should have type crypto', () => {
    expect(cryptoMarketDataSource).toHaveProperty(
      'type',
      MarketDataClass.crypto,
    )
  })

  it('should lazy initialize the http client', async () => {
    await cryptoMarketDataSource.get('/hello')
    await cryptoMarketDataSource.get('/goodbye')
    expect(createHttpClient).toHaveBeenCalledTimes(1)
  })

  it('should invoke the http client get method with the correct URL', async () => {
    await cryptoMarketDataSource.get('/hello')
    expect(mockHttpClientGet).toHaveBeenCalledWith('/hello', undefined)
  })

  it('should invoke the http client get method with the correct URL and query params', async () => {
    await cryptoMarketDataSource.get('/hello', {
      foo: 'bar',
    })
    expect(mockHttpClientGet).toHaveBeenCalledWith('/hello', {
      foo: 'bar',
    })
  })
})
