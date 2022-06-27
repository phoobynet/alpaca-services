import { MarketDataClass, MarketDataSource } from '../../types'
import { BarsBetweenArgs, getBarsBetween } from './getBarsBetween'
import { parseISO } from 'date-fns'

describe('getBarsBetween', () => {
  it('should invoke market data with correct URL', async () => {
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
})
