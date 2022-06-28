import { MarketDataClass, MarketDataSource } from '../types'
import { createHttpClient, HttpClient } from '../../common'

let httpClient: HttpClient

const getHttpClient = (): HttpClient => {
  if (!httpClient) {
    httpClient = createHttpClient('https://data.alpaca.markets/v1beta1/crypto')
  }

  return httpClient
}

export const cryptoMarketDataSource: MarketDataSource = {
  async get<T>(url: string, queryParams?: Record<string, string>): Promise<T> {
    return getHttpClient().get<T>(url, queryParams)
  },
  type: MarketDataClass.crypto,
}
