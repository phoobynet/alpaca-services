import { cryptoMarketDataSource } from '@/marketData/http'
import { MarketDataClass } from '@/marketData/types'
import { createHttpClient } from '@/http'

const createHttpClientMock = createHttpClient as jest.Mock
const createHttpClientGetMock = jest.fn()

describe('cryptoMarketDataSource', () => {
  beforeEach(() => {
    createHttpClientMock.mockClear()
    createHttpClientGetMock.mockClear()
    createHttpClientMock.mockImplementation(() => {
      return {
        get: createHttpClientGetMock,
        post: jest.fn(),
        put: jest.fn(),
        delete: jest.fn(),
      }
    })
  })
  test('should have type crypto', () => {
    expect(cryptoMarketDataSource).toHaveProperty(
      'type',
      MarketDataClass.crypto,
    )
  })

  test('should lazy initialize the http client', async () => {
    await cryptoMarketDataSource.get('/hello')
    await cryptoMarketDataSource.get('/goodbye')
    expect(createHttpClient).toHaveBeenCalledTimes(1)
  })

  test('should invoke the http client get method with the correct URL', async () => {
    await cryptoMarketDataSource.get('/hello')
    expect(createHttpClientGetMock).toHaveBeenCalledWith('/hello', undefined)
  })

  test('should invoke the http client get method with the correct URL and query params', async () => {
    await cryptoMarketDataSource.get('/hello', {
      foo: 'bar',
    })
    expect(createHttpClientGetMock).toHaveBeenCalledWith('/hello', {
      foo: 'bar',
    })
  })
})
