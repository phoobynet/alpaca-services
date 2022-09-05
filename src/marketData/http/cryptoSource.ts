import { MarketDataClass, MarketDataSource } from '@/marketData/types'
import { createHttpClient, HttpClient } from '@/http'
import { Mutex, MutexInterface } from 'async-mutex'
import { options } from '@/options'

let httpClient: HttpClient

/**
 * @internal
 * @group Market Data
 * @category HTTP
 */
const getHttpClient = (): HttpClient => {
  if (!httpClient) {
    httpClient = createHttpClient('https://data.alpaca.markets/v1beta1/crypto')
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
export const cryptoSource: MarketDataSource = {
  async get<T>(url: string, queryParams?: Record<string, string>): Promise<T> {
    const { disableRestMutex } = options.get()
    let release: MutexInterface.Releaser | undefined = undefined
    if (!disableRestMutex) {
      release = await httpGetMutex.acquire()
    }

    try {
      const httpResponse = await getHttpClient().get<T>(url, queryParams)

      if (httpResponse.ok) {
        return httpResponse.data as T
      } else {
        throw new Error(httpResponse.message)
      }
    } finally {
      if (!disableRestMutex && release) {
        release()
      }
    }
  },
  type: MarketDataClass.crypto,
}
