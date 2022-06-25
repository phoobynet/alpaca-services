import { MarketDataSource } from '../types'
import { getStockMarketDataHttpClient } from './getStockMarketDataHttpClient'

export const stockMarketDataSource: MarketDataSource = <T>(
  url: string,
  queryParams?: Record<string, string>,
): Promise<T> => {
  return getStockMarketDataHttpClient()
    .get<T>(url, {
      params: queryParams || {},
    })
    .then((r) => r.data)
}

stockMarketDataSource.type = 'stock'
