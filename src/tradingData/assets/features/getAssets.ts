import { Asset, AssetRepository } from '../types'
import { getTradingData } from '../../http'

export const getAssets = (
  assetRepository?: AssetRepository,
): Promise<Asset[]> => {
  if (assetRepository) {
    return assetRepository.findAll()
  }

  return getTradingData<Asset[]>('/assets')
}
