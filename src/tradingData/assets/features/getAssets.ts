import { Asset, AssetRepository } from '../types'
import { getTradeData } from '../../http'

/**
 * Retrieve all assets
 * @remarks If a {@link AssetRepository} is provided, and assets are found, the function WILL NOT fall back to HTTP.
 * @group Trading Data
 * @category Assets
 * @see https://alpaca.markets/docs/api-references/trading-api/assets/
 * @param {AssetRepository} [assetRepository] - Provide an implementation of {@link AssetRepository} to bypass HTTP request.
 */
export const getAssets = (
  assetRepository?: AssetRepository,
): Promise<Asset[]> => {
  if (assetRepository) {
    return assetRepository.findAll()
  }

  return getTradeData<Asset[]>('/assets')
}
