import { Asset, AssetRepository } from '@/tradingData/assets/types'
import { getTradeData } from '@/tradingData/http'
import { options } from '@/options'

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
 * @param {string} symbol - A valid ticker symbol, e.g. AAPL or BTCUSD for an {@link Asset}
 * @param {AssetRepository} [assetRepository] - Provide an implementation of {@link AssetRepository} to bypass HTTP request.  Can be set globally in {@link Option}
 * @param {boolean} forceHttp - bypass assetRepository and force HTTP request
 */
export const getAsset = async (
  symbol: string,
  assetRepository?: AssetRepository,
  forceHttp = false,
): Promise<Asset | undefined> => {
  assetRepository = assetRepository || options.get().assetRepository

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
