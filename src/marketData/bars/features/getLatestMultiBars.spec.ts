import { cleanSymbol } from '../../../common'
import { getMarketDataPagedMultiObject } from '../../http'
import type { MarketDataSource } from '../../types'
import { MarketDataClass, MarketDataFeed } from '../../types'
import { cleanLatestMultiBars } from '../helpers'
import { LatestMultiBarsArgs } from '../types'
const { getLatestMultiBars } = jest.requireActual('./getLatestMultiBars')

describe('getLatestMultiBars', () => {
  ;(cleanSymbol as jest.Mock).mockImplementation((symbol: string) => symbol)
  ;(getMarketDataPagedMultiObject as jest.Mock).mockResolvedValue({
    BTCUSD: {
      o: 1,
      h: 1,
      l: 1,
      c: 1,
      v: 1,
      x: 'CBSE',
      t: '2020-01-01T12:00:00.555777Z',
    },
  })

  afterEach(() => {
    jest.clearAllMocks()
  })
  test('should throw if symbols is empty', () => {
    const args: LatestMultiBarsArgs = {
      symbols: [],
      exchange: 'CBSE',
    }

    return expect(
      getLatestMultiBars(
        {
          get: jest.fn(),
          type: MarketDataClass.stock,
        },
        args,
      ),
    ).rejects.toThrow('LatestMultiBarsArgs.symbols was empty')
  })
  describe('crypto', () => {
    const marketDataSource: MarketDataSource = {
      get: jest.fn().mockResolvedValue({
        bars: {
          BTCUSD: {
            o: 1,
            h: 1,
            l: 1,
            c: 1,
            v: 1,
            x: 'CBSE',
            t: '2020-01-01T12:00:00.555777Z',
          },
        },
      }),
      type: MarketDataClass.crypto,
    }

    test('should throw if exchange is empty', () => {
      const args: LatestMultiBarsArgs = {
        symbols: ['BTCUSD'],
        exchange: '',
      }

      return expect(getLatestMultiBars(marketDataSource, args)).rejects.toThrow(
        'Exchange is required for crypto market data',
      )
    })

    test('should throw if feed is provided', () => {
      const args: LatestMultiBarsArgs = {
        symbols: ['BTCUSD'],
        feed: MarketDataFeed.sip,
        exchange: 'CBSE',
      }

      return expect(getLatestMultiBars(marketDataSource, args)).rejects.toThrow(
        'Feed should not be provided for crypto market data',
      )
    })

    test('should invoke getMarketDataPagedMultiObject with the correct args', async () => {
      const args: LatestMultiBarsArgs = {
        symbols: ['BTCUSD', 'ETHUSD'],
        exchange: 'CBSE',
      }

      await getLatestMultiBars(marketDataSource, args)

      expect(getMarketDataPagedMultiObject).toHaveBeenCalledWith(
        marketDataSource,
        '/bars/latest',
        {
          symbols: 'BTCUSD,ETHUSD',
          exchange: 'CBSE',
        },
      )
    })
    test('should clean latest mulit bars', async () => {
      const args: LatestMultiBarsArgs = {
        symbols: ['BTCUSD', 'ETHUSD'],
        exchange: 'CBSE',
      }

      await getLatestMultiBars(marketDataSource, args)

      expect(cleanLatestMultiBars).toHaveBeenCalledWith({
        BTCUSD: {
          o: 1,
          h: 1,
          l: 1,
          c: 1,
          v: 1,
          x: 'CBSE',
          t: '2020-01-01T12:00:00.555777Z',
        },
      })
    })
  })

  describe('stock', () => {
    const marketDataSource: MarketDataSource = {
      get: jest.fn().mockResolvedValue({
        bars: {
          BTCUSD: {
            o: 1,
            h: 1,
            l: 1,
            c: 1,
            v: 1,
            vw: 1,
            n: 1,
            t: '2020-01-01T12:00:00.555777Z',
          },
        },
      }),
      type: MarketDataClass.stock,
    }
    test('should throw if exchange is provided', () => {
      const args: LatestMultiBarsArgs = {
        symbols: ['AAPL'],
        exchange: 'CBSE',
        feed: MarketDataFeed.sip,
      }

      return expect(getLatestMultiBars(marketDataSource, args)).rejects.toThrow(
        'Exchange should not be provided for stock market data',
      )
    })

    test('if feed is not provided, feed should not be a query param', async () => {
      const args: LatestMultiBarsArgs = {
        symbols: ['AAPL'],
      }

      await getLatestMultiBars(marketDataSource, args)

      expect(getMarketDataPagedMultiObject).toHaveBeenCalledWith(
        marketDataSource,
        '/bars/latest',
        {
          symbols: 'AAPL',
        },
      )
    })

    test('if feed is provided, feed should be a query param', async () => {
      const args: LatestMultiBarsArgs = {
        symbols: ['AAPL'],
        feed: MarketDataFeed.sip,
      }

      await getLatestMultiBars(marketDataSource, args)

      expect(getMarketDataPagedMultiObject).toHaveBeenCalledWith(
        marketDataSource,
        '/bars/latest',
        {
          symbols: 'AAPL',
          feed: 'sip',
        },
      )
    })
  })
})
