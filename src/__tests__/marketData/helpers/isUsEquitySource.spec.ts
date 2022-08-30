import {
  MarketDataClass,
  MarketDataSource,
  MarketDataSourceType,
} from '@/marketData/types'

const { isUsEquitySource } = jest.requireActual(
  '@/marketData/helpers/isUsEquitySource',
)

describe('isUsEquitySource', () => {
  const testCases: Array<[MarketDataSourceType, boolean]> = [
    [MarketDataClass.us_equity, true],
    [MarketDataClass.crypto, false],
    [{ type: MarketDataClass.us_equity } as MarketDataSource, true],
    [{ type: MarketDataClass.crypto } as MarketDataSource, false],
  ]

  test.each(testCases)(
    'For source "%s" the result should be "%s"',
    (marketDataSource, expected) => {
      const actual = isUsEquitySource(marketDataSource)
      expect(actual).toBe(expected)
    },
  )
})
