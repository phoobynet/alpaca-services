import {
  MarketDataClass,
  MarketDataSource,
  MarketDataSourceType,
} from '@/marketData/types'

const { isStockMarketDataSource } = jest.requireActual(
  '@/marketData/helpers/isStockMarketDataSource',
)

describe('isStockMarketDataSource', () => {
  const testCases: Array<[MarketDataSourceType, boolean]> = [
    [MarketDataClass.stock, true],
    [MarketDataClass.crypto, false],
    [{ type: MarketDataClass.stock } as MarketDataSource, true],
    [{ type: MarketDataClass.crypto } as MarketDataSource, false],
  ]

  test.each(testCases)(
    'For source "%s" the result should be "%s"',
    (marketDataSource, expected) => {
      const actual = isStockMarketDataSource(marketDataSource)
      expect(actual).toBe(expected)
    },
  )
})
