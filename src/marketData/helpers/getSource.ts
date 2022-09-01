import { MarketDataSource } from '@/marketData'
import { Asset, getAsset } from '@/tradingData'
import { getSourceFromAsset } from '@/marketData/helpers/getSourceFromAsset'

/**
 * Gets the market data source for the given asset, symbol, or, if you have already provided a source, that source.
 * @param {MarketDataSource | Asset | string} sourceAssetOrSymbol - provide either a source, asset, or symbol to return the correct source
 */
export const getSource = async (
  sourceAssetOrSymbol: MarketDataSource | Asset | string,
): Promise<MarketDataSource> => {
  let marketDataSource: MarketDataSource

  let asset: Asset | undefined
  if (typeof sourceAssetOrSymbol === 'string') {
    asset = await getAsset(sourceAssetOrSymbol)

    if (!asset) {
      throw new Error('Asset not found')
    }

    marketDataSource = getSourceFromAsset(asset)
  } else if ('symbol' in sourceAssetOrSymbol) {
    marketDataSource = getSourceFromAsset(sourceAssetOrSymbol as Asset)
  } else {
    marketDataSource = sourceAssetOrSymbol as MarketDataSource
  }

  return marketDataSource
}
