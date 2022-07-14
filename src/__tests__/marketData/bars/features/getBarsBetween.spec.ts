import { MarketDataClass, MarketDataSource } from '@/marketData/types'
import { BarsBetweenArgs } from '@/marketData/bars/types'

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
    exchanges: ['CBSE', 'FRSX'],
    symbol: 'BTCUSD',
    timeframe: '1Day',
  }

  test('should invoke with correct URL and query parameters', async () => {
    await getBarsBetween(mockMarketDataSource, args)
    expect(getMarketDataIteratorMock).toHaveBeenCalledWith(
      mockMarketDataSource,
      {
        url: '/BTCUSD/bars',
        queryParams: {
          start: start.toISOString(),
          end: end.toISOString(),
          exchanges: 'CBSE,FRSX',
          timeframe: '1Day',
        },
        absoluteLimit: 500,
        tidy: expect.any(Function),
      },
    )
  })
})
