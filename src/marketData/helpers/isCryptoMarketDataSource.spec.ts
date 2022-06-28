import {
  MarketDataClass,
  MarketDataSource,
  MarketDataSourceType,
} from '../types'
import { isCryptoMarketDataSource } from './isCryptoMarketDataSource'

describe('isCryptoMarketDataSource', () => {
  const testCases: Array<[MarketDataSourceType, boolean]> = [
    [MarketDataClass.crypto, true],
    [MarketDataClass.stock, false],
    [{ type: MarketDataClass.crypto } as MarketDataSource, true],
    [{ type: MarketDataClass.stock } as MarketDataSource, false],
  ]

  test.each(testCases)(
    'For source "%s" the result should be "%s"',
    (marketDataSource, expected) => {
      const actual = isCryptoMarketDataSource(marketDataSource)
      expect(actual).toBe(expected)
    },
  )
})
