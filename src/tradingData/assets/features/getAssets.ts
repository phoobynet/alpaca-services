import { Asset, AssetRepository } from '@/tradingData/assets/types'
import { getTradeData } from '@/tradingData/http'
import { options } from '@/options'

/**
 * Retrieve all assets
 * @remarks If a {@link AssetRepository} is provided, and assets are found, the function WILL NOT fall back to HTTP.
 * @group Trading Data
 * @category Assets
 * @see https://alpaca.markets/docs/api-references/trading-api/assets/
 * @param {AssetRepository} [assetRepository] - Provide an implementation of {@link AssetRepository} to bypass HTTP request.  Can be set globally in {@link Option}
 * @param {boolean} forceHttp - bypass assetRepository and force HTTP request
 */
export const getAssets = async (
  assetRepository?: AssetRepository,
  forceHttp = false,
): Promise<Asset[]> => {
  assetRepository = assetRepository || options.get().assetRepository

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
