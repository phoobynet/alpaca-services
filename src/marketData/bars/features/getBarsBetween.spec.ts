import { cleanSymbol } from '../../../helpers'
import { MarketDataClass, MarketDataSource } from '../../types'
import { assertTimeframe } from '../assertions'
import { BarsBetweenArgs } from '../types'
import { isCryptoMarketDataSource } from '../../helpers'
import { getMarketDataIterator } from '../../http'

const { getBarsBetween } = jest.requireActual('./getBarsBetween')

describe('getBarsBetween', () => {
  const mockMarketDataSource: MarketDataSource = {
    get: jest.fn(),
    type: MarketDataClass.crypto,
  }
  const symbol = 'BTCUSD'

  const args: BarsBetweenArgs = {
    symbol,
    start: new Date('2020-01-01'),
    end: new Date('2020-01-02'),
    timeframe: '1Hour',
    exchange: 'CBSE',
  }
  describe('validation', () => {
    test('should clean the symbol', async () => {
      await getBarsBetween(mockMarketDataSource, args)
      expect(cleanSymbol).toHaveBeenCalledWith(symbol)
    })

    test('should assert the timeframe is valid', async () => {
      await getBarsBetween(mockMarketDataSource, args)
      expect(assertTimeframe).toHaveBeenCalledWith(args.timeframe)
    })

    test('should throw if source is crypto and exchange is not provided', async () => {
      ;(isCryptoMarketDataSource as jest.Mock).mockReturnValueOnce(true)

      const noExchangeArgs = {
        ...args,
        exchange: undefined,
      }

      await expect(async () =>
        getBarsBetween(mockMarketDataSource, noExchangeArgs),
      ).rejects.toThrow('Exchange is required for crypto market data')
    })
  })

  test('should invoke iterator', async () => {
    ;(cleanSymbol as jest.Mock).mockReturnValueOnce(symbol)
    await getBarsBetween(mockMarketDataSource, args)
    expect(getMarketDataIterator).toHaveBeenCalledWith(expect.anything(), {
      url: '/BTCUSD/bars',
      queryParams: {
        start: '2020-01-01T00:00:00.000Z',
        end: '2020-01-02T00:00:00.000Z',
        timeframe: '1Hour',
      },
      absoluteLimit: 1_000,
      tidy: expect.any(Function),
    })
  })
})
