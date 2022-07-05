import { MarketDataClass, MarketDataFeed, MarketDataSource } from '../../types'
import { LatestMultiBarsArgs } from '../types'
import {
  isCryptoMarketDataSource,
  isStockMarketDataSource,
} from '../../helpers'
import { getMarketDataPagedMultiObject } from '../../http'
import { cleanString, cleanSymbols } from '../../../helpers'

const { getLatestMultiBars } = jest.requireActual('./getLatestMultiBars')

const cleanStringMock = cleanString as jest.Mock
const cleanSymbolsMock = cleanSymbols as jest.Mock
const isCryptoMarketDataSourceMock = isCryptoMarketDataSource as jest.Mock
const isStockMarketDataSourceMock = isStockMarketDataSource as jest.Mock
const getMarketDataPagedMultiObjectMock =
  getMarketDataPagedMultiObject as jest.Mock

describe('getLatestMultiBars', () => {
  beforeAll(() => {
    cleanStringMock.mockImplementation((v: string) => v)
  })

  describe('for stocks', () => {
    const rawLatestMultiBarsResult = {
      bars: {
        AMZN: {
          t: '2022-04-11T17:33:00Z',
          o: 144.29,
          h: 144.56,
          l: 144.29,
          c: 144.55,
          v: 304,
          n: 4,
          vw: 144.467895,
        },
        AAPL: {
          t: '2022-04-11T17:34:00Z',
          o: 166.87,
          h: 166.98,
          l: 166.81,
          c: 166.98,
          v: 1765,
          n: 25,
          vw: 166.871524,
        },
      },
    }
    const stockMarketDataSource: MarketDataSource = {
      get: jest.fn().mockResolvedValue(rawLatestMultiBarsResult),
      type: MarketDataClass.stock,
    }

    const stockArgs: LatestMultiBarsArgs = {
      symbols: ['AAPL', 'AMZN'],
      feed: MarketDataFeed.sip,
    }

    beforeAll(() => {
      isStockMarketDataSourceMock.mockReturnValue(true)
      isCryptoMarketDataSourceMock.mockReturnValue(false)
      getMarketDataPagedMultiObjectMock.mockResolvedValue(
        rawLatestMultiBarsResult,
      )
      cleanSymbolsMock.mockReturnValue(['AAPL', 'AMZN'])
    })

    describe('validation', () => {
      test('throw when symbols is empty', async () => {
        await expect(async () =>
          getLatestMultiBars(stockMarketDataSource, {
            symbols: [],
          }),
        ).rejects.toThrow('symbols is empty')
      })

      test('should clean symbols', async () => {
        await getLatestMultiBars(stockMarketDataSource, stockArgs)
        expect(cleanSymbolsMock).toHaveBeenCalledWith(stockArgs.symbols)
      })

      test('should clean feed', async () => {
        await getLatestMultiBars(stockMarketDataSource, stockArgs)
        expect(cleanStringMock).toHaveBeenCalledWith(stockArgs.feed)
      })

      test('if exchange is provided, throw', async () => {
        await expect(async () =>
          getLatestMultiBars(stockMarketDataSource, {
            symbols: ['AAPL'],
            exchange: 'CBSE',
          }),
        ).rejects.toThrow(
          'Exchange should not be provided for stock market data',
        )
      })
    })

    describe('http request', () => {
      test('should include feed query params when feed in args', async () => {
        await getLatestMultiBars(stockMarketDataSource, stockArgs)
        expect(getMarketDataPagedMultiObjectMock).toHaveBeenCalledWith(
          stockMarketDataSource,
          '/bars/latest',
          {
            symbols: 'AAPL,AMZN',
            feed: 'sip',
          },
        )
      })
    })
  })

  describe('for crypto', () => {
    const cryptoMarketDataSource: MarketDataSource = {
      get: jest.fn().mockResolvedValue({}),
      type: MarketDataClass.crypto,
    }
    const cryptoArgs: LatestMultiBarsArgs = {
      symbols: ['BTCUSD', 'ETHUSD'],
      exchange: 'CBSE',
    }

    const rawLatestMultiBarsResult = {
      bars: {
        BTCUSD: {
          t: '2022-04-11T17:33:00Z',
          o: 144.29,
          h: 144.56,
          l: 144.29,
          c: 144.55,
          v: 304,
          n: 4,
          vw: 144.467895,
        },
        ETHUSD: {
          t: '2022-04-11T17:34:00Z',
          o: 166.87,
          h: 166.98,
          l: 166.81,
          c: 166.98,
          v: 1765,
          n: 25,
          vw: 166.871524,
        },
      },
    }

    beforeAll(() => {
      isCryptoMarketDataSourceMock.mockReturnValue(true)
      isStockMarketDataSourceMock.mockReturnValue(false)
      getMarketDataPagedMultiObjectMock.mockResolvedValue(
        rawLatestMultiBarsResult,
      )
      cleanSymbolsMock.mockReturnValueOnce(['BTCUSD', 'ETHUSD'])
    })

    describe('validation', () => {
      test('throw when symbols is empty', async () => {
        await expect(async () =>
          getLatestMultiBars(cryptoMarketDataSource, {
            symbols: [],
          }),
        ).rejects.toThrow('symbols is empty')
      })

      test('should clean symbols', async () => {
        await getLatestMultiBars(cryptoMarketDataSource, cryptoArgs)
        expect(cleanSymbolsMock).toHaveBeenCalledWith(cryptoArgs.symbols)
      })

      test('should clean exchange', async () => {
        await getLatestMultiBars(cryptoMarketDataSource, cryptoArgs)
        expect(cleanStringMock).toHaveBeenCalledWith(cryptoArgs.exchange)
      })

      test('if exchange is not provied, throw', async () => {
        await expect(async () => {
          await getLatestMultiBars(cryptoMarketDataSource, {
            symbols: ['BTCUSD', 'ETHUSD'],
          })
        }).rejects.toThrow('Exchange is required for crypto market data')
      })

      test('if feed is provided, throw', async () => {
        await expect(async () =>
          getLatestMultiBars(cryptoMarketDataSource, {
            symbols: ['BTCUSD', 'ETHUSD'],
            exchange: 'CBSE',
            feed: MarketDataFeed.sip,
          }),
        ).rejects.toThrow('Feed should not be provided for crypto market data')
      })
    })

    describe('http request', () => {
      test('should include feed query params when feed in args', async () => {
        await getLatestMultiBars(cryptoMarketDataSource, cryptoArgs)
        expect(getMarketDataPagedMultiObjectMock).toHaveBeenCalledWith(
          cryptoMarketDataSource,
          '/bars/latest',
          {
            symbols: 'BTCUSD,ETHUSD',
            exchange: 'CBSE',
          },
        )
      })
    })
  })
})
