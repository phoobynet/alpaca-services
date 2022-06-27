import { MarketDataClass, MarketDataSource } from '../types'
import { getCryptoMarketDataHttpClient } from './getCryptoMarketDataHttpClient'

export const cryptoMarketDataSource: MarketDataSource = {
  async get<T>(url: string, queryParams?: Record<string, string>): Promise<T> {
    return getCryptoMarketDataHttpClient()
      .get<T>(url, {
        params: queryParams,
      })
      .then((r) => r.data)
  },
  type: MarketDataClass.crypto,
}
