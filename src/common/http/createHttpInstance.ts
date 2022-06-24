import rateLimit from 'axios-rate-limit'
import axios, { AxiosInstance } from 'axios'
import { options } from '../../options'

export const createHttpInstance = (baseURL: string): AxiosInstance => {
  const instance = rateLimit(
    axios.create({
      baseURL,
    }),
    { maxRPS: 3 },
  )

  instance.interceptors.request.use((config) => {
    const { key, secret } = options.get()
    config.headers = {
      ...config.headers,
      'APCA-API-KEY-ID': key,
      'APCA-API-SECRET-KEY': secret,
    }
    return config
  })

  return instance
}
