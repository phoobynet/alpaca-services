import { createHttpClient, HttpClient } from '../../common'

let httpClient: HttpClient

/**
 * Uses baseURL https://paper-api.alpaca.markets/v2
 */
export const getTradeHttpClient = (): HttpClient => {
  if (!httpClient) {
    // TODO: allow user to determine the baseURL
    httpClient = createHttpClient('https://paper-api.alpaca.markets/v2')
  }

  return httpClient
}
