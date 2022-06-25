import { AxiosInstance } from 'axios'
import { createHttpInstance } from '../../common'

let httpClient: AxiosInstance

export function getCryptoMarketDataHttpClient(): AxiosInstance {
  if (!httpClient) {
    httpClient = createHttpInstance(
      'https://data.alpaca.markets/v1beta1/crypto',
    )
  }

  return httpClient
}
