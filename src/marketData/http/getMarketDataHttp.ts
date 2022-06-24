import { options } from '../../options'
import rateLimit from 'axios-rate-limit'
import axios, { AxiosInstance } from 'axios'

let axiosInstance: AxiosInstance

/**
 * Uses baseURL https://data.alpaca.markets/v2
 */
export function getMarketDataHttp() {
  if (!axiosInstance) {
    axiosInstance = rateLimit(
      axios.create({
        baseURL: 'https://data.alpaca.markets/v2',
      }),
      { maxRPS: 3 },
    )

    axiosInstance.interceptors.request.use((config) => {
      const { key, secret } = options.get()
      config.headers = {
        ...config.headers,
        'APCA-API-KEY-ID': key,
        'APCA-API-SECRET-KEY': secret,
      }
      return config
    })
  }

  return axiosInstance
}
