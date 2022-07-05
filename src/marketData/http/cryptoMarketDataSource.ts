import { MarketDataClass, MarketDataSource } from '../types'
import { createHttpClient, HttpClient } from '../../http'

let httpClient: HttpClient

const getHttpClient = (): HttpClient => {
  if (!httpClient) {
    httpClient = createHttpClient('https://data.alpaca.markets/v1beta1/crypto')
  }

  return httpClient
}

export const cryptoMarketDataSource: MarketDataSource = {
  async get<T>(url: string, queryParams?: Record<string, string>): Promise<T> {
    const httpResponse = await getHttpClient().get<T>(url, queryParams)

    if (httpResponse.ok) {
      return httpResponse.data as T
    } else {
      throw new Error(httpResponse.message)
    }
  },
  type: MarketDataClass.crypto,
}
