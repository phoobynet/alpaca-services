import {
  MarketDataClass,
  MarketDataSource,
  MarketDataSourceType,
} from '../types'

export const isCryptoMarketDataSource = (
  marketDataSource: MarketDataSourceType | MarketDataSource,
): boolean => {
  if (
    typeof marketDataSource === 'string' &&
    marketDataSource === MarketDataClass.crypto
  ) {
    return true
  } else {
    return (
      (marketDataSource as MarketDataSource).type === MarketDataClass.crypto
    )
  }
}
