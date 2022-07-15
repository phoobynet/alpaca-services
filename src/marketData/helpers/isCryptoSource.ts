import {
  MarketDataClass,
  MarketDataSource,
  MarketDataSourceType,
} from '@/marketData/types'

/**
 * @group Market Data
 * @category Helpers
 * @param {MarketDataSource} marketDataSourceType - {@link cryptoSource}, {@link usEquitySource}, or {@link MarketDataClass}
 */
export const isCryptoSource = (
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
