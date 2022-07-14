import { MarketDataSource, MarketDataSourceType } from '../types'

/**
 * @group Market Data
 * @category Helpers
 * @param {MarketDataSource} marketDataSourceType - {@link cryptoMarketDataSource}, {@link stockMarketDataSource}, or {@link MarketDataClass}
 */
export const isStockMarketDataSource = (
  marketDataSourceType: MarketDataSourceType | MarketDataSource,
): boolean => {
  if (
    typeof marketDataSourceType === 'string' &&
    marketDataSourceType === 'stock'
  ) {
    return true
  } else {
    return (marketDataSourceType as MarketDataSource).type === 'stock'
  }
}
