import {
  Asset,
  AssetRepository,
  getActiveAssets,
  getAsset,
} from '@/tradingData'
import { cleanSymbol } from '@/marketData/helpers'

const assetMap = new Map<string, Asset>()

/**
 * This is a default in-memory asset repository.
 */
export const assetRepository: AssetRepository = {
  async find(symbol: string): Promise<Asset | undefined> {
    symbol = cleanSymbol(symbol)

    if (assetMap.has(symbol)) {
      return assetMap.get(symbol)
    }

    const asset = await getAsset(symbol, true)

    if (asset) {
      assetMap.set(symbol, asset)
    }

    return asset
  },
  async findAll(): Promise<Asset[]> {
    // arbitrary number to indicate that we don't have enough assets to say we have all of them
    if (assetMap.size < 5_000) {
      const assets = await getActiveAssets(true)
      assets.forEach((asset) => assetMap.set(asset.symbol, asset))
    }

    return Array.from(assetMap.values())
  },
  isDefault: true,
}
