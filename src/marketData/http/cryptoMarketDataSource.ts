import { MarketDataSource } from '../types'
import { getCryptoMarketDataHttpClient } from './getCryptoMarketDataHttpClient'

export const cryptoMarketDataSource: MarketDataSource = async <T>(
  url: string,
  queryParams?: Record<string, string>,
): Promise<T> => {
  return getCryptoMarketDataHttpClient()
    .get<T>(url, {
      params: queryParams,
    })
    .then((r) => r.data)
}

cryptoMarketDataSource.type = 'crypto'
