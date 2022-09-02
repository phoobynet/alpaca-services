import { MarketDataClass, MarketDataSource } from '@/marketData/types'
import { createHttpClient, HttpClient } from '@/http'
import { Mutex } from 'async-mutex'

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

// due to limitations of the Alpaca Crypto API, we need to use a mutex
// to prevent 429
const httpGetMutex = new Mutex()

/**
 * @group Market Data
 * @category HTTP
 */
export const usEquitySource: MarketDataSource = {
  async get<T>(url: string, queryParams?: Record<string, string>): Promise<T> {
    const release = await httpGetMutex.acquire()
    try {
      const httpResponse = await getHttpClient().get<T>(url, queryParams)

      if (httpResponse.ok) {
        return httpResponse.data as T
      } else {
        throw new Error(httpResponse.message)
      }
    } finally {
      release()
    }
  },
  type: MarketDataClass.us_equity,
}
