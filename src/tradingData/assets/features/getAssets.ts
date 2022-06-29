import { Asset, AssetRepository } from '../types'
import { getTradeData } from '../../http'

export const getAssets = (
  assetRepository?: AssetRepository,
): Promise<Asset[]> => {
  if (assetRepository) {
    return assetRepository.findAll()
  }

  return getTradeData<Asset[]>('/assets')
}
