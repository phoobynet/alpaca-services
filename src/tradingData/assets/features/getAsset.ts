import { Asset, AssetRepository } from '../types'
import { getTradeData } from '../../http'

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
 * @param {AssetRepository} [assetRepository] - Provide an implementation of {@link AssetRepository} to bypass HTTP request.
 */
export const getAsset = async (
  symbol: string,
  assetRepository?: AssetRepository,
): Promise<Asset | undefined> => {
  if (assetRepository) {
    return assetRepository.find(symbol)
  }

  const httpResponse = await getTradeData<Asset>(`/assets/${symbol}`)

  if (httpResponse.ok) {
    return httpResponse.data
  } else {
    throw new Error(httpResponse.message)
  }
}
