import { AxiosInstance } from 'axios'
import { createHttpInstance } from '../../common'

let httpClient: AxiosInstance

export function getStockMarketDataHttpClient(): AxiosInstance {
  if (!httpClient) {
    httpClient = createHttpInstance('https://data.alpaca.markets/v2/stocks')
  }

  return httpClient
}
