import { AxiosInstance } from 'axios'
import { createHttpInstance } from '../../common'

let tradingHttp: AxiosInstance

/**
 * Uses baseURL https://paper-api.alpaca.markets/v2
 */
export function getTradingDataHttp() {
  if (!tradingHttp) {
    tradingHttp = createHttpInstance('https://paper-api.alpaca.markets/v2')
  }

  return tradingHttp
}
