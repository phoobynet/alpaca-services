import rateLimit from 'axios-rate-limit'
import axios from 'axios'
import { options } from '../../../options'
import { HttpClient } from '../types'

export const createHttpClient = (baseURL: string): HttpClient => {
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

  return {
    get<T>(url: string, queryParams?: Record<string, string>): Promise<T> {
      return instance.get(url, { params: queryParams }).then((r) => r.data)
    },
  }
}
