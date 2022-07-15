import axios, { AxiosError, AxiosResponse } from 'axios'
import axiosRetry from 'axios-retry'
import { options } from '@/options'
import { HttpClient, HttpResponse } from '@/http'

/**
 * Create an HTTP client for the given base URL.
 * @internal
 * @group Common
 * @category HTTP
 * @remarks This function is a wrapper around the axios library.  If the status code returned is 429, the function will retry the request.
 * @param baseURL
 * @returns {@link HttpClient}
 */
export const createHttpClient = (baseURL: string): HttpClient => {
  const instance = axios.create({
    baseURL,
    validateStatus: (status) => status !== 429,
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
    ): Promise<HttpResponse<T>> {
      return instance.get<T>(url, { params: queryParams }).then(toHttpResponse)
    },
    async post<T>(
      url: string,
      queryParams?: Record<string, string>,
      data?: unknown,
    ): Promise<HttpResponse<T>> {
      return instance
        .post<T>(url, data, { params: queryParams })
        .then(toHttpResponse)
    },
    async put<T>(
      url: string,
      queryParams?: Record<string, string>,
      data?: unknown,
    ): Promise<HttpResponse<T>> {
      return instance
        .put<T>(url, data, { params: queryParams })
        .then(toHttpResponse)
    },
    async delete(
      url: string,
      queryParams?: Record<string, string>,
    ): Promise<HttpResponse<void>> {
      return instance.delete(url, { params: queryParams }).then(toHttpResponse)
    },
  }
}

function toHttpResponse<T>(response: AxiosResponse<T>): HttpResponse<T> {
  const { status: statusCode, statusText, data } = response

  if (statusCode >= 400 && statusCode !== 429) {
    let message = statusText
    let alpacaCode = 0
    const data = response.data as Record<string, unknown>

    if ('code' in data) {
      alpacaCode = data.code as number
    }

    if ('message' in data) {
      message = data.message as string
    }
    return {
      ok: false,
      alpacaCode,
      statusCode,
      statusText,
      message: message || statusText,
      data: undefined,
    }
  } else {
    return {
      ok: true,
      statusCode,
      statusText,
      data,
    }
  }
}
