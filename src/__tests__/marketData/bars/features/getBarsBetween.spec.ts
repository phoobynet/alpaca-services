import {
  BarsBetweenArgs,
  MarketDataClass,
  MarketDataSource,
} from '@/marketData'
import { cleanBar } from '@/marketData/bars/helpers'

import { getMarketDataIterator } from '@/marketData/http'

const { getBarsBetween } = jest.requireActual(
  '@/marketData/bars/features/getBarsBetween.ts',
)

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
    expect(getMarketDataIterator).toHaveBeenCalledWith(mockMarketDataSource, {
      url: '/BTCUSD/bars',
      queryParams: {
        start: start.toISOString(),
        end: end.toISOString(),
        exchanges: 'CBSE,FRSX',
        timeframe: '1Day',
      },
      absoluteLimit: 500,
      tidy: expect.any(Function),
    })
  })

  test('should clean each bar returned', async () => {
    const getMarketDataIteratorMock = getMarketDataIterator as jest.Mock

    getMarketDataIteratorMock.mockResolvedValueOnce({
      async [Symbol.asyncIterator]() {
        return {
          next: () => ({
            value: {
              o: 1,
              h: 2,
              l: 3,
              c: 4,
              v: 5,
              t: new Date('2022-07-02').toISOString(),
            },
            done: true,
          }),
        }
      },
    })

    await getBarsBetween(mockMarketDataSource, args)
    expect(cleanBar).toHaveBeenCalled()
  })
})
