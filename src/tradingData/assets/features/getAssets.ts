import { Asset } from '@/tradingData/assets/types'
import { getTradeData } from '@/tradingData/http'
import { options } from '@/options'

/**
 * Retrieve all assets
 * @remarks If a {@link AssetRepository} is provided, and assets are found, the function WILL NOT fall back to HTTP.
 * @group Trading Data
 * @category Assets
 * @see https://alpaca.markets/docs/api-references/trading-api/assets/
 * @param {boolean} forceHttp - bypass assetRepository and force HTTP request
 */
export const getAssets = async (forceHttp = false): Promise<Asset[]> => {
  const { assetRepository } = options.get()

  if (assetRepository && !forceHttp) {
    return assetRepository.findAll()
  }

  const httpResponse = await getTradeData<Asset[]>('/assets')

  if (httpResponse.ok) {
    return httpResponse.data || []
  } else {
    throw new Error(httpResponse.message)
  }
}
