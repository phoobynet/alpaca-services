import { MarketDataClass, MarketDataFeed, MarketDataSource } from '../../types'
import {
  isCryptoMarketDataSource,
  isStockMarketDataSource,
} from '../../helpers'
import { cleanBar } from '../helpers'
import { cleanSymbol } from '../../../helpers'

const { getLatestBar } = jest.requireActual('./getLatestBar')

describe('getLatestBar', () => {
  const symbol = 'BTCUSD'
  const mockMarketDataSource: MarketDataSource = {
    get: jest.fn().mockResolvedValue({
      bar: {
        o: 1,
        h: 1,
        l: 1,
        c: 1,
        v: 1,
        vw: 1,
        n: 1,
        t: '2020-01-01T00:00:00.000Z',
      },
      symbol,
    }),
    type: MarketDataClass.crypto,
  }

  describe('validation', () => {
    test('should clean symbol', async () => {
      await getLatestBar(mockMarketDataSource, { symbol })
      expect(cleanSymbol).toHaveBeenCalledWith(symbol)
    })

    test('if source is crypto and exchange is not provided, throw', async () => {
      ;(isCryptoMarketDataSource as jest.Mock).mockReturnValueOnce(true)
      await expect(async () =>
        getLatestBar(mockMarketDataSource, {
          symbol,
          exchange: undefined,
        }),
      ).rejects.toThrow('Exchange is required for crypto market data')
    })

    test('if source is crypto and feed is provided, throw', async () => {
      ;(isCryptoMarketDataSource as jest.Mock).mockReturnValueOnce(true)
      await expect(async () =>
        getLatestBar(mockMarketDataSource, {
          symbol,
          exchange: 'CBSE',
          feed: 'ABC',
        }),
      ).rejects.toThrow('Feed should not be provided for crypto market data')
    })

    test('if source is stock and exchange is provided, throw', async () => {
      ;(isCryptoMarketDataSource as jest.Mock).mockReturnValueOnce(false)
      ;(isStockMarketDataSource as jest.Mock).mockReturnValueOnce(true)

      await expect(async () =>
        getLatestBar(mockMarketDataSource, {
          symbol,
          exchange: 'CBSE',
          feed: 'ABC',
        }),
      ).rejects.toThrow('Exchange should not be provided for stock market data')
    })
  })

  describe('source invocation', () => {
    test('should invoke cleanBar', async () => {
      ;(isCryptoMarketDataSource as jest.Mock).mockReturnValueOnce(false)
      ;(isStockMarketDataSource as jest.Mock).mockReturnValueOnce(true)
      ;(cleanSymbol as jest.Mock).mockReturnValueOnce(symbol)

      await getLatestBar(mockMarketDataSource, {
        symbol,
        feed: MarketDataFeed.sip,
      })

      expect(cleanBar).toHaveBeenCalledWith({
        bar: {
          o: 1,
          h: 1,
          l: 1,
          c: 1,
          v: 1,
          vw: 1,
          n: 1,
          t: '2020-01-01T00:00:00.000Z',
        },
        symbol,
      })
    })

    describe('crypto market data source', () => {
      test('query params should include exchange', async () => {
        ;(isCryptoMarketDataSource as jest.Mock).mockReturnValueOnce(true)
        ;(isStockMarketDataSource as jest.Mock).mockReturnValueOnce(false)
        ;(cleanSymbol as jest.Mock).mockReturnValueOnce(symbol)

        await getLatestBar(mockMarketDataSource, {
          symbol,
          exchange: 'CBSE',
        })

        expect(mockMarketDataSource.get).toHaveBeenCalledWith(
          `/${symbol}/bars/latest`,
          {
            exchange: 'CBSE',
          },
        )
      })
    })

    describe('stock market data source', () => {
      test('when feed option is set, feed should be included in the queryParams', async () => {
        ;(isCryptoMarketDataSource as jest.Mock).mockReturnValueOnce(false)
        ;(isStockMarketDataSource as jest.Mock).mockReturnValueOnce(true)
        ;(cleanSymbol as jest.Mock).mockReturnValueOnce(symbol)

        await getLatestBar(mockMarketDataSource, {
          symbol,
          feed: MarketDataFeed.sip,
        })

        expect(mockMarketDataSource.get).toHaveBeenCalledWith(
          `/${symbol}/bars/latest`,
          {
            feed: MarketDataFeed.sip,
          },
        )
      })

      test('when no feed option is set, query params should be empty', async () => {
        ;(isCryptoMarketDataSource as jest.Mock).mockReturnValueOnce(false)
        ;(isStockMarketDataSource as jest.Mock).mockReturnValueOnce(true)
        ;(cleanSymbol as jest.Mock).mockReturnValueOnce(symbol)

        await getLatestBar(mockMarketDataSource, {
          symbol,
        })

        expect(mockMarketDataSource.get).toHaveBeenCalledWith(
          `/${symbol}/bars/latest`,
          {},
        )
      })
    })
  })
})
