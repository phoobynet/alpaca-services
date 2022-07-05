import {
  MarketDataClass,
  MarketDataSource,
  MarketDataSourceType,
} from '../types'

const { isCryptoMarketDataSource } = jest.requireActual(
  './isCryptoMarketDataSource',
)

describe('isCryptoMarketDataSource', () => {
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
      marketDataSourceType: MarketDataClass.stock,
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
        type: MarketDataClass.stock,
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
