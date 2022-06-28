import { MarketDataClass, MarketDataSource } from '../types'
import { createHttpClient, HttpClient } from '../../common'

let httpClient: HttpClient

const getHttpClient = (): HttpClient => {
  if (!httpClient) {
    httpClient = createHttpClient('https://data.alpaca.markets/v2/stocks')
  }

  return httpClient
}

export const stockMarketDataSource: MarketDataSource = {
  async get<T>(url: string, queryParams?: Record<string, string>): Promise<T> {
    return getHttpClient().get<T>(url, queryParams)
  },
  type: MarketDataClass.stock,
}
