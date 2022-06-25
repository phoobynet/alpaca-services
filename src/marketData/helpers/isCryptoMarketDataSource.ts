import { MarketDataSourceType } from '../bars/types'
import { MarketDataSource } from '../types'

export const isCryptoMarketDataSource = (
  marketDataSource: MarketDataSourceType,
): boolean => {
  if (typeof marketDataSource === 'string' && marketDataSource === 'crypto') {
    return true
  } else {
    return (marketDataSource as MarketDataSource).type === 'crypto'
  }
}
