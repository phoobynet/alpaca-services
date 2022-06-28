import { stockMarketDataSource } from './stockMarketDataSource'
import { MarketDataClass } from '../types'
import { createHttpClient } from '../../common'

const getFn = jest.fn()

jest.mock('../../', () => ({
  __esModule: true,
  createHttpClient: jest.fn().mockReturnValue({
    post: jest.fn(),
    get: getFn,
    put: jest.fn(),
    delete: jest.fn(),
  }),
}))

describe('stockMarketDataSource', () => {
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
    expect(getFn).toHaveBeenCalledWith('/hello', undefined)
  })

  it('should invoke the http client get method with the correct URL and query params', async () => {
    await stockMarketDataSource.get('/hello', {
      foo: 'bar',
    })
    expect(getFn).toHaveBeenCalledWith('/hello', {
      foo: 'bar',
    })
  })
})
