import { AxiosInstance } from 'axios'
import { createHttpInstance } from '../../common'

let marketDataHttp: AxiosInstance

/**
 * Uses baseURL https://data.alpaca.markets/v2
 */
export function getMarketDataHttp() {
  if (!marketDataHttp) {
    marketDataHttp = createHttpInstance('https://data.alpaca.markets/v2')
  }

  return marketDataHttp
}
