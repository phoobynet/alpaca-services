import { Asset, AssetRepository } from '../types'
import { getTradeHttpClient } from '../../http'

export const getAssets = (
  assetRepository?: AssetRepository,
): Promise<Asset[]> => {
  if (assetRepository) {
    return assetRepository.findAll()
  }

  return getTradeHttpClient().get<Asset[]>('/assets')
}
