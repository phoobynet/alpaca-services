import { Asset, AssetRepository } from '../types'
import { getTradeData } from '../../http'
import { cleanSymbol } from '../../../common'

export const getAsset = (
  symbol: string,
  assetRepository?: AssetRepository,
): Promise<Asset | undefined> => {
  symbol = cleanSymbol(symbol)

  if (assetRepository) {
    return assetRepository.find(symbol)
  }

  return getTradeData<Asset>(`/assets/${symbol}`)
}
