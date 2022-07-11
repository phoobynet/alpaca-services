import { MarketDataClass } from '@/marketData/types'
import { createHttpClient } from '@/http'

const { stockMarketDataSource } = jest.requireActual(
  '@/marketData/http/stockMarketDataSource',
)

const createHttpClientMock = createHttpClient as jest.Mock

describe('stockMarketDataSource', () => {
  let httpClientGet: jest.Mock

  beforeAll(() => {
    httpClientGet = jest.fn()
    createHttpClientMock.mockImplementation(() => ({
      get: httpClientGet,
    }))
  })

  test('should have type stock', () => {
    expect(stockMarketDataSource).toHaveProperty('type', MarketDataClass.stock)
  })

  test('should lazy initialize the http client', async () => {
    await stockMarketDataSource.get('/hello')
    await stockMarketDataSource.get('/goodbye')
    expect(createHttpClientMock).toHaveBeenCalledTimes(1)
  })

  test('should invoke the http client get method with the correct URL', async () => {
    await stockMarketDataSource.get('/hello')
    expect(httpClientGet).toHaveBeenCalledWith('/hello', undefined)
  })

  test('should invoke the http client get method with the correct URL and query params', async () => {
    await stockMarketDataSource.get('/hello', {
      foo: 'bar',
    })
    expect(httpClientGet).toHaveBeenCalledWith('/hello', {
      foo: 'bar',
    })
  })
})
