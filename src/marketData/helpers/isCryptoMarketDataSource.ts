import {
  MarketDataClass,
  MarketDataSource,
  MarketDataSourceType,
} from '@/marketData/types'

/**
 * @group Market Data
 * @category Helpers
 * @param {MarketDataSource} marketDataSourceType - {@link cryptoMarketDataSource}, {@link stockMarketDataSource}, or {@link MarketDataClass}
 */
export const isCryptoMarketDataSource = (
  marketDataSourceType: MarketDataSourceType,
): boolean => {
  if (
    typeof marketDataSourceType === 'string' &&
    marketDataSourceType === MarketDataClass.crypto
  ) {
    return true
  } else {
    return (
      (marketDataSourceType as MarketDataSource).type === MarketDataClass.crypto
    )
  }
}
