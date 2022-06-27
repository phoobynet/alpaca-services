import { AxiosInstance } from 'axios'
import { createHttpInstance } from '../../common'
import { MarketDataError } from '../types/MarketDataError'
import { MarketDataClass } from '../types'

let httpClient: AxiosInstance

export function getCryptoMarketDataHttpClient(): AxiosInstance {
  if (!httpClient) {
    httpClient = createHttpInstance(
      'https://data.alpaca.markets/v1beta1/crypto',
    )

    httpClient.interceptors.response.use(
      (response) => {
        return response
      },
      (error) => {
        throw new MarketDataError(error, MarketDataClass.crypto)
      },
    )
  }

  return httpClient
}
