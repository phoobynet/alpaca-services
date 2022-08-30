import { MarketDataClass } from '@/marketData/types'
import { createHttpClient } from '@/http'

const { usEquitySource } = jest.requireActual(
  '@/marketData/http/usEquitySource',
)

const createHttpClientMock = createHttpClient as jest.Mock

describe('usEquitySource', () => {
  let httpClientGet: jest.Mock

  beforeAll(() => {
    httpClientGet = jest.fn().mockResolvedValue({ ok: true, data: {} })
    createHttpClientMock.mockImplementation(() => ({
      get: httpClientGet,
    }))
  })

  test('should have type stock', () => {
    expect(usEquitySource).toHaveProperty('type', MarketDataClass.us_equity)
  })

  test('should lazy initialize the http client', async () => {
    await usEquitySource.get('/hello')
    await usEquitySource.get('/goodbye')
    expect(createHttpClientMock).toHaveBeenCalledTimes(1)
  })

  test('should invoke the http client get method with the correct URL', async () => {
    await usEquitySource.get('/hello')
    expect(httpClientGet).toHaveBeenCalledWith('/hello', undefined)
  })

  test('should invoke the http client get method with the correct URL and query params', async () => {
    await usEquitySource.get('/hello', {
      foo: 'bar',
    })
    expect(httpClientGet).toHaveBeenCalledWith('/hello', {
      foo: 'bar',
    })
  })
})
