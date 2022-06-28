import { stockMarketDataSource } from './stockMarketDataSource'
import { MarketDataClass } from '../types'
import { createHttpClient } from '../../common/http/features/createHttpClient'
import { HttpClient } from '../../common'

jest.mock('../../common/http/features/createHttpClient')
const mockHttpClient = createHttpClient as jest.Mock<HttpClient>
const mockHttpClientGet = jest.fn()

describe('stockMarketDataSource', () => {
  beforeEach(() => {
    mockHttpClient.mockClear()
    mockHttpClientGet.mockClear()
    mockHttpClient.mockImplementation(() => {
      return {
        get: mockHttpClientGet,
      }
    })
  })
  it('should have type stock', () => {
    expect(stockMarketDataSource).toHaveProperty('type', MarketDataClass.stock)
  })

  it('should lazy initialize the http client', async () => {
    await stockMarketDataSource.get('/hello')
    await stockMarketDataSource.get('/goodbye')
    expect(createHttpClient).toHaveBeenCalledTimes(1)
  })

  it('should invoke the http client get method with the correct URL', async () => {
    await stockMarketDataSource.get('/hello')
    expect(mockHttpClientGet).toHaveBeenCalledWith('/hello', undefined)
  })

  it('should invoke the http client get method with the correct URL and query params', async () => {
    await stockMarketDataSource.get('/hello', {
      foo: 'bar',
    })
    expect(mockHttpClientGet).toHaveBeenCalledWith('/hello', {
      foo: 'bar',
    })
  })
})
