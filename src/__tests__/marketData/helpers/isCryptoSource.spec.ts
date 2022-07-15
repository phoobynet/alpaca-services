import {
  MarketDataClass,
  MarketDataSource,
  MarketDataSourceType,
} from '@/marketData/types'

const { isCryptoMarketDataSource } = jest.requireActual(
  '@/marketData/helpers/isCryptoMarketDataSource',
)

describe('isCryptoSource', () => {
  type TestCase = {
    marketDataSourceType: MarketDataSourceType
    expected: boolean
  }
  const testCases: TestCase[] = [
    {
      marketDataSourceType: MarketDataClass.crypto,
      expected: true,
    },
    {
      marketDataSourceType: MarketDataClass.us_equity,
      expected: false,
    },
    {
      marketDataSourceType: {
        get: jest.fn(),
        type: MarketDataClass.crypto,
      } as MarketDataSource,
      expected: true,
    },
    {
      marketDataSourceType: {
        get: jest.fn(),
        type: MarketDataClass.us_equity,
      } as MarketDataSource,
      expected: false,
    },
  ]

  test.each(testCases)(
    'For source "$marketDataSourceType" the result should be "$expected"',
    (testCase: TestCase) => {
      const actual = isCryptoMarketDataSource(testCase.marketDataSourceType)
      expect(actual).toBe(testCase.expected)
    },
  )
})
