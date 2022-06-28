import { createHttpClient, HttpClient } from '../../common'

let httpClient: HttpClient

/**
 * Uses baseURL https://paper-api.alpaca.markets/v2
 */
const getTradingDataHttp = () => {
  if (!httpClient) {
    // TODO: allow user to determine the baseURL
    httpClient = createHttpClient('https://paper-api.alpaca.markets/v2')
  }

  return httpClient
}

export const getTradingData = <T>(
  url: string,
  queryParams?: Record<string, string>,
): Promise<T> => {
  return getTradingDataHttp().get<T>(url, queryParams)
}
