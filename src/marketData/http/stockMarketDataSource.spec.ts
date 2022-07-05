import { MarketDataClass } from '../types'
import { createHttpClient } from '../../http'

const { stockMarketDataSource } = jest.requireActual('./stockMarketDataSource')

const createHttpClientMock = createHttpClient as jest.Mock

describe('stockMarketDataSource', () => {
  let httpClientGet: jest.Mock

  beforeAll(() => {
    httpClientGet = jest.fn()
    createHttpClientMock.mockImplementation(() => ({
      get: httpClientGet,
    }))
  })
  it('should have type stock', () => {
    expect(stockMarketDataSource).toHaveProperty('type', MarketDataClass.stock)
  })

  it('should lazy initialize the http client', async () => {
    await stockMarketDataSource.get('/hello')
    await stockMarketDataSource.get('/goodbye')
    expect(createHttpClientMock).toHaveBeenCalledTimes(1)
  })

  it('should invoke the http client get method with the correct URL', async () => {
    await stockMarketDataSource.get('/hello')
    expect(httpClientGet).toHaveBeenCalledWith('/hello', undefined)
  })

  it('should invoke the http client get method with the correct URL and query params', async () => {
    await stockMarketDataSource.get('/hello', {
      foo: 'bar',
    })
    expect(httpClientGet).toHaveBeenCalledWith('/hello', {
      foo: 'bar',
    })
  })
})
