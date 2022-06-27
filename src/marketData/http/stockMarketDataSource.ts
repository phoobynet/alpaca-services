import { MarketDataClass, MarketDataSource } from '../types'
import { getStockMarketDataHttpClient } from './getStockMarketDataHttpClient'

export const stockMarketDataSource: MarketDataSource = {
  async get<T>(url: string, queryParams?: Record<string, string>): Promise<T> {
    return getStockMarketDataHttpClient()
      .get<T>(url, {
        params: queryParams || {},
      })
      .then((r) => r.data)
  },
  type: MarketDataClass.stock,
}
