import {
  MarketDataClass,
  MarketDataSource,
  MarketDataSourceType,
} from '../types'

/**
 * @group Market Data
 * @category Helpers
 * @param {MarketDataSource} marketDataSourceType - {@link cryptoSource}, {@link usEquitySource}, or {@link MarketDataClass}
 */
export const isUsEquitySource = (
  marketDataSourceType: MarketDataSourceType | MarketDataSource,
): boolean => {
  if (
    typeof marketDataSourceType === 'string' &&
    marketDataSourceType === MarketDataClass.us_equity
  ) {
    return true
  } else {
    return (marketDataSourceType as MarketDataSource).type === 'us_equity'
  }
}
