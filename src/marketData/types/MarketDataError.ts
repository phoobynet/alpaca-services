import { AxiosError } from 'axios'
import { get } from 'lodash'
import { MarketDataClass } from './MarketDataClass'

export class MarketDataError extends Error {
  public code: number
  public statusCode: number
  public statusText: string

  constructor(axiosError: AxiosError, public marketDataClass: MarketDataClass) {
    const message = get(
      axiosError,
      'response.data.message',
      'Something went wrong',
    )
    super(message)

    this.code = parseInt(get(axiosError, 'response.data.code', '0'))
    this.statusCode = axiosError.response?.status ?? 0
    this.statusText = axiosError.response?.statusText ?? 'Unknown'
    this.name = 'MarketDataError'
  }

  toString(): string {
    return `${this.name}.${this.marketDataClass}: http(${this.statusCode}, ${this.statusText}): Alpaca Error: ${this.code}->${this.message}`
  }
}
