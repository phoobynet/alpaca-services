import {
  MarketDataClass,
  MarketDataSource,
  MarketDataSourceType,
} from '@/marketData/types'

const { isCryptoSource } = jest.requireActual(
  '@/marketData/helpers/isCryptoSource',
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
      const actual = isCryptoSource(testCase.marketDataSourceType)
      expect(actual).toBe(testCase.expected)
    },
  )
})
