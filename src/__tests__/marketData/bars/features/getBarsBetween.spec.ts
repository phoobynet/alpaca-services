import { MarketDataClass, MarketDataSource } from '@/marketData/types'
import {
  BarsBetweenArgs,
  BarTimeframe,
  BarTimeframeUnit,
} from '@/marketData/bars/types'

import { getMarketDataIterator } from '@/marketData/http'

const { getBarsBetween } = jest.requireActual(
  '@/marketData/bars/features/getBarsBetween.ts',
)

const getMarketDataIteratorMock = getMarketDataIterator as jest.Mock

describe('getBarsBetween', () => {
  const mockMarketDataSource: MarketDataSource = {
    get: jest.fn(),
    type: MarketDataClass.crypto,
  }

  const start = new Date('2022-07-02')
  const end = new Date('2022-07-09')

  const args: BarsBetweenArgs = {
    absoluteLimit: 500,
    start,
    end,
    symbol: 'BTC/USD',
    timeframe: BarTimeframe.from(1, BarTimeframeUnit.minute),
  }

  test('should invoke with correct URL and query parameters', async () => {
    await getBarsBetween(mockMarketDataSource, args)
    expect(getMarketDataIteratorMock).toHaveBeenCalledWith(
      mockMarketDataSource,
      {
        // This is f**cked! The URL is wrong!
        url: '/bars?',
        queryParams: {
          start: start.toISOString(),
          end: end.toISOString(),
          timeframe: '1Day',
        },
        absoluteLimit: 500,
        tidy: expect.any(Function),
      },
    )
  })
})
