import { Asset } from '@/tradingData/assets/types'
import { getTradeData } from '@/tradingData/http'
import { options } from '@/options'
import { cleanSymbol } from '@/marketData/helpers'

/**
 * Retrieve the {@link Asset} for the given symbol.
 *
 * @remarks If an {@link AssetRepository} is provided, and no {@link Asset} is found, the function WILL NOT fall back to HTTP.
 * @group Trading Data
 * @category Assets
 * @see https://alpaca.markets/docs/api-references/trading-api/assets/
 * @example
 * ```ts
 * const asset = await getAsset('AAPL')
 * ```
 * @param {string} symbol - A valid ticker symbol, e.g. AAPL or BTC/USD for an {@link Asset}
 * @param {boolean} forceHttp - bypass assetRepository and force HTTP request
 */
export const getAsset = async (
  symbol: string,
  forceHttp = false,
): Promise<Asset | undefined> => {
  symbol = cleanSymbol(symbol)
  const { assetRepository } = options.get()

  if (assetRepository && !forceHttp) {
    return assetRepository.find(symbol)
  }

  const httpResponse = await getTradeData<Asset>(`/assets/${symbol}`)

  if (httpResponse.ok) {
    return httpResponse.data
  } else {
    throw new Error(httpResponse.message)
  }
}
