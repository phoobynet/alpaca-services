import axios, { AxiosError, AxiosResponse } from 'axios'
import axiosRetry from 'axios-retry'
import { options } from '../../../options'
import { HttpClient } from '../types'

/**
 * Create an HTTP client for the given base URL.
 * @internal
 * @group Common
 * @category HTTP
 * @remarks This function is a wrapper around the axios library.  If the status code returned is 429, the function will retry the request.
 * @param baseURL
 */
export const createHttpClient = (baseURL: string): HttpClient => {
  const instance = axios.create({
    baseURL,
  })

  axiosRetry(instance, {
    retryDelay: axiosRetry.exponentialDelay,
    retryCondition: (error: AxiosError) => error.response?.status === 429,
    onRetry: (retryCount, error, requestConfig) => {
      const { url } = requestConfig
      const { status, statusText } = error.response as AxiosResponse
      console.debug(`Retrying ${url} (${retryCount}): ${status} ${statusText}`)
    },
  })

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
    async get<T>(
      url: string,
      queryParams?: Record<string, string>,
    ): Promise<T> {
      return instance
        .get(url, { params: queryParams })
        .then((r) => r.data)
        .catch((err) => {
          if (err instanceof AxiosError) {
            throw toHttpClientError(err)
          } else {
            throw err
          }
        })
    },
    async post<T>(
      url: string,
      queryParams?: Record<string, string>,
      data?: unknown,
    ): Promise<T> {
      return instance
        .post<T>(url, data, { params: queryParams })
        .then((r) => r.data)
        .catch((err) => {
          if (err instanceof AxiosError) {
            throw toHttpClientError(err)
          } else {
            throw err
          }
        })
    },
    async put<T>(
      url: string,
      queryParams?: Record<string, string>,
      data?: unknown,
    ): Promise<T> {
      return instance
        .put<T>(url, data, { params: queryParams })
        .then((r) => r.data)
        .catch((err) => {
          if (err instanceof AxiosError) {
            throw toHttpClientError(err)
          } else {
            throw err
          }
        })
    },
    async delete(
      url: string,
      queryParams?: Record<string, string>,
    ): Promise<void> {
      await instance.delete(url, { params: queryParams }).catch((err) => {
        if (err instanceof AxiosError) {
          throw toHttpClientError(err)
        } else {
          throw err
        }
      })
    },
  }
}

/**
 * @group Common
 * @category HTTP
 */
export class HttpClientError extends Error {
  constructor(
    message: string,
    public url: string,
    public statusCode: number,
    public code?: number,
  ) {
    super(message)
    this.name = 'HttpClientError'
  }
}

function toHttpClientError(err: AxiosError): HttpClientError {
  const r = err.response as AxiosResponse
  const { status, statusText, request } = r

  let code = 0
  let message = statusText
  const data = r.data as Record<string, unknown>

  if ('code' in data) {
    code = data.code as number
  }

  if ('message' in data) {
    message = data.message as string
  }

  return new HttpClientError(message, request.url, status, code)
}
