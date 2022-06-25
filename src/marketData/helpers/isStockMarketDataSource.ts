import { MarketDataSourceType } from '../bars/types'
import { MarketDataSource } from '../types'

export const isStockMarketDataSource = (
  marketDataSource: MarketDataSourceType,
): boolean => {
  if (typeof marketDataSource === 'string' && marketDataSource === 'stock') {
    return true
  } else {
    return (marketDataSource as MarketDataSource).type === 'stock'
  }
}
