import { createHttpClient, HttpClient } from '../../common'
import { options } from '../../options'

let httpClient: HttpClient

/**
 * Uses baseURL https://paper-api.alpaca.markets/v2
 */
export const getTradeHttpClient = (): HttpClient => {
  if (!httpClient) {
    // TODO: allow user to determine the baseURL
    const { paper } = options.get()

    const url = paper
      ? 'https://paper-api.alpaca.markets/v2'
      : 'https://api.alpaca.markets/v2'

    httpClient = createHttpClient(url)
  }

  return httpClient
}
