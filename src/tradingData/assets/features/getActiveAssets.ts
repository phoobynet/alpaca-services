import { Asset } from '@/tradingData'
import { options } from '@/options'
import { getTradeData } from '@/tradingData/http'

/**
 * @group Trading Data
 * @category Assets
 * @param forceHttp
 * @example
 * ```ts
 * const assets = await getActiveAssets()
 * ```
 */
export const getActiveAssets = async (forceHttp: boolean): Promise<Asset[]> => {
  const { assetRepository } = options.get()

  if (assetRepository && !forceHttp) {
    return assetRepository
      .findAll()
      .then((assets) => assets.filter((asset) => asset.status === 'active'))
  }

  const httpResponse = await getTradeData<Asset[]>('/assets', {
    status: 'active',
  })

  if (httpResponse.ok) {
    return httpResponse.data || []
  } else {
    throw new Error(httpResponse.message)
  }
}
