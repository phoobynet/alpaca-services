import { options } from '@/options'
import { createHttpClient, HttpClient } from '@/http'

let httpClient: HttpClient

export const getTradeHttpClient = (): HttpClient => {
  if (!httpClient) {
    const { tradingBaseUrl } = options.get()

    if (!tradingBaseUrl) {
      throw new Error(
        'For some weird reason the trading base URL has not been set',
      )
    }

    httpClient = createHttpClient(tradingBaseUrl)
  }

  return httpClient
}
