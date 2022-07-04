import { MarketDataClass, MarketDataFeed, MarketDataSource } from '../../types'
import { getLatestBar } from './getLatestBar'
import { ArgumentValidationError, cleanSymbol } from '../../../common'
import { Bar, RawBar } from '../types'
import { cleanBar } from '../helpers'

jest.mock('../../../common')
jest.mock('../helpers')

const rawCryptoBar: RawBar = {
  bar: {
    o: 1,
    h: 1,
    l: 1,
    c: 1,
    v: 1,
    x: 'CBSE',
    t: '2020-01-01T12:00:00.555777',
  },
  symbol: 'BTCUSD',
}

const rawStockBar: RawBar = {
  bar: {
    o: 1,
    h: 1,
    l: 1,
    c: 1,
    v: 1,
    vw: 1,
    n: 1,
    t: '2020-01-01T12:00:00.555777',
  },
  symbol: 'AAPL',
}

const cryptoBar: Bar = {
  o: 1,
  h: 1,
  l: 1,
  c: 1,
  v: 1,
  x: 'CBSE',
  t: '2020-01-01T12:00:00.555',
}

const stockBar: Bar = {
  o: 1,
  h: 1,
  l: 1,
  c: 1,
  v: 1,
  vw: 1,
  n: 1,
  t: '2020-01-01T12:00:00.555',
}

describe('getLatestBar', () => {
  ;(cleanSymbol as jest.Mock).mockImplementation((symbol: string) => symbol)

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('crypto', () => {
    ;(cleanBar as jest.Mock).mockReturnValue(cryptoBar)

    beforeEach(() => {
      jest.clearAllMocks()
    })
    const marketDataSource: MarketDataSource = {
      get: jest.fn().mockResolvedValue(rawCryptoBar),
      type: MarketDataClass.crypto,
    }

    test('throw error if exchange is not provided', async () => {
      await expect(() =>
        getLatestBar(marketDataSource, {
          symbol: 'BTCUSD',
          exchange: '',
        }),
      ).toThrowError(
        new ArgumentValidationError(
          'Exchange is required for crypto market data',
        ),
      )
    })

    test('throw error if feed is provided', async () => {
      await expect(() =>
        getLatestBar(marketDataSource, {
          symbol: 'BTCUSD',
          exchange: 'CBSE',
          feed: MarketDataFeed.sip,
        }),
      ).toThrowError(
        new ArgumentValidationError(
          'Feed should not be provided for crypto market data',
        ),
      )
    })

    test('should clean symbol', async () => {
      await getLatestBar(marketDataSource, {
        symbol: 'BTCUSD',
        exchange: 'CBSE',
      })

      expect(cleanSymbol).toHaveBeenCalledWith('BTCUSD')
    })

    test('should clean bar', async () => {
      await getLatestBar(marketDataSource, {
        symbol: 'BTCUSD',
        exchange: 'CBSE',
      })
      expect(cleanBar).toHaveBeenCalledWith(rawCryptoBar)
    })
  })

  describe('stock', () => {
    ;(cleanBar as jest.Mock).mockReturnValue(stockBar)

    beforeEach(() => {
      jest.clearAllMocks()
    })
    const marketDataSource: MarketDataSource = {
      get: jest.fn().mockResolvedValue(rawStockBar),
      type: MarketDataClass.stock,
    }

    test('throw error if exchange is provided', async () => {
      await expect(() =>
        getLatestBar(marketDataSource, {
          symbol: 'AAPL',
          exchange: 'CBSE',
        }),
      ).toThrowError(
        new ArgumentValidationError(
          'Exchange should not be provided for stock market data',
        ),
      )
    })

    test('should clean symbol', async () => {
      await getLatestBar(marketDataSource, {
        symbol: 'AAPL',
        feed: MarketDataFeed.sip,
      })

      expect(cleanSymbol).toHaveBeenCalledWith('AAPL')
    })

    test('should clean bar', async () => {
      await getLatestBar(marketDataSource, {
        symbol: 'AAPL',
        feed: MarketDataFeed.sip,
      })
      expect(cleanBar).toHaveBeenCalledWith(rawStockBar)
    })
  })
})
