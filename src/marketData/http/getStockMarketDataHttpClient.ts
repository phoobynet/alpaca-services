import { AxiosInstance } from 'axios'
import { createHttpInstance } from '../../common'
import { MarketDataError } from '../types/MarketDataError'
import { MarketDataClass } from '../types'

let httpClient: AxiosInstance

export function getStockMarketDataHttpClient(): AxiosInstance {
  if (!httpClient) {
    httpClient = createHttpInstance('https://data.alpaca.markets/v2/stocks')
    httpClient.interceptors.response.use(
      (response) => {
        return response
      },
      (error) => {
        throw new MarketDataError(error, MarketDataClass.stock)
      },
    )
  }

  return httpClient
}
