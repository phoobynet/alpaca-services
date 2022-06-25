import { MarketDataSource, MarketDataSourceType } from '../types'

export const isStockMarketDataSource = (
  marketDataSource: MarketDataSourceType | MarketDataSource,
): boolean => {
  if (typeof marketDataSource === 'string' && marketDataSource === 'stock') {
    return true
  } else {
    return (marketDataSource as MarketDataSource).type === 'stock'
  }
}
