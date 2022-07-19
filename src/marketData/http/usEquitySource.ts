import { MarketDataClass, MarketDataSource } from '@/marketData/types'
import { createHttpClient, HttpClient } from '@/http'

let httpClient: HttpClient

/**
 * @internal
 * @group Market Data
 * @category HTTP
 */
const getHttpClient = (): HttpClient => {
  if (!httpClient) {
    httpClient = createHttpClient('https://data.alpaca.markets/v2/stocks')
  }

  return httpClient
}

/**
 * @group Market Data
 * @category HTTP
 */
export const usEquitySource: MarketDataSource = {
  async get<T>(url: string, queryParams?: Record<string, string>): Promise<T> {
    const httpResponse = await getHttpClient().get<T>(url, queryParams)

    if (httpResponse.ok) {
      return httpResponse.data as T
    } else {
      throw new Error(httpResponse.message)
    }
  },
  type: MarketDataClass.us_equity,
}
