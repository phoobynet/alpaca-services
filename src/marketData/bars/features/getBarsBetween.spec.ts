import { MarketDataClass, MarketDataSource } from '../../types'
import { BarsBetweenArgs, getBarsBetween } from './getBarsBetween'
import { parseISO } from 'date-fns'

describe('getBarsBetween', () => {
  beforeEach(() => {
    jest.resetModules()
  })
  test('should invoke market data with correct URL', async () => {
    const mockedDataSource: jest.Mocked<MarketDataSource> = {
      get: jest.fn().mockResolvedValue({
        bars: [],
        next_page_token: '',
      }),
      type: MarketDataClass.stock,
    }

    const args: BarsBetweenArgs = {
      symbol: 'AAPL',
      start: parseISO('2020-01-01'),
      end: parseISO('2020-01-02'),
      absoluteLimit: 1_000,
      timeframe: '1Min',
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    for await (const _ of getBarsBetween(mockedDataSource, args)) {
      // do nothing
    }

    expect(mockedDataSource.get).toHaveBeenCalledWith('/AAPL/bars', {
      start: '2020-01-01T00:00:00.000Z',
      end: '2020-01-02T00:00:00.000Z',
      limit: '1000',
      timeframe: '1Min',
    })
  })

  test('should throw error if timeframe is invalid', async () => {
    const mockedDataSource: jest.Mocked<MarketDataSource> = {
      get: jest.fn().mockResolvedValue({
        bars: [],
        next_page_token: '',
      }),
      type: MarketDataClass.stock,
    }

    const args: BarsBetweenArgs = {
      symbol: 'AAPL',
      start: parseISO('2020-01-01'),
      end: parseISO('2020-01-02'),
      absoluteLimit: 1_000,
      timeframe: '1Foo',
    }

    await expect(async () => {
      await getBarsBetween(mockedDataSource, args)
    }).rejects.toThrowError('Invalid timeframe')
  })

  test('should throw error if source is crypto and exchange is not defined', async () => {
    const mockedDataSource: jest.Mocked<MarketDataSource> = {
      get: jest.fn().mockResolvedValue({
        bars: [],
        next_page_token: '',
      }),
      type: MarketDataClass.crypto,
    }

    const args: BarsBetweenArgs = {
      symbol: 'BTCUSD',
      start: parseISO('2020-01-01'),
      end: parseISO('2020-01-02'),
      absoluteLimit: 1_000,
      timeframe: '1Min',
    }

    await expect(() => {
      getBarsBetween(mockedDataSource, args)
    }).toThrowError('Exchange is required for crypto market data')
  })

  // TODO: async iterators are in issue for testing
  test.todo('should invoke iterator', async () => {
    jest.doMock('../../http', () => {
      return {
        __esModule: true,
        getMarketDataIterator: jest.fn().mockResolvedValueOnce({
          [Symbol.asyncIterator]() {
            return Promise.resolve({
              next: jest.fn().mockResolvedValue(undefined),
              done: true,
            })
          },
        }),
      }
    })
    const mockedDataSource: jest.Mocked<MarketDataSource> = {
      get: jest.fn().mockResolvedValue({
        bars: [],
        next_page_token: '',
      }),
      type: MarketDataClass.stock,
    }

    const args: BarsBetweenArgs = {
      symbol: 'AAPL',
      start: parseISO('2020-01-01'),
      end: parseISO('2020-01-02'),
      absoluteLimit: 1_000,
      timeframe: '1Min',
    }
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    return import('../../http').then(async (module) => {
      await getBarsBetween(mockedDataSource, args)
      expect(module.getMarketDataIterator).toHaveBeenCalled()
    })
  })
})
