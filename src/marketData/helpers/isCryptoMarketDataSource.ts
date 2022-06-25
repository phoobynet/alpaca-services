import { MarketDataSource, MarketDataSourceType } from '../types'

export const isCryptoMarketDataSource = (
  marketDataSource: MarketDataSourceType | MarketDataSource,
): boolean => {
  if (typeof marketDataSource === 'string' && marketDataSource === 'crypto') {
    return true
  } else {
    return (marketDataSource as MarketDataSource).type === 'crypto'
  }
}
