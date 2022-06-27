import { MarketDataClass, MarketDataSource } from '../../types'
import { getLatestBar } from './getLatestBar'
import { RawBar } from '../types'

describe('getLatestBar', () => {
  afterEach(() => jest.clearAllMocks())

  describe('for stock market data source', () => {
    const mockStockBar: RawBar = {
      symbol: 'AAPL',
      bar: {
        o: 100,
        h: 100,
        l: 100,
        c: 100,
        v: 1_000,
        t: '2020-01-01T12:00:00.666666Z',
      },
    }

    const mockStockDataSource: jest.Mocked<MarketDataSource> = {
      get: jest.fn().mockResolvedValue(mockStockBar),
      type: MarketDataClass.stock,
    }

    it('should throw error if exchange is provided', async () => {
      await expect(async () => {
        await getLatestBar(mockStockDataSource, 'AAPL', 'NYSE')
      }).rejects.toThrowError(
        'Exchange should not be provided for stock market data',
      )
    })

    it('should invoke market data with correct args', async () => {
      await getLatestBar(mockStockDataSource, 'AAPL')
      expect(mockStockDataSource.get).toHaveBeenCalledWith(
        '/AAPL/bars/latest',
        {},
      )
    })

    it('should add S property containing symbol', async () => {
      const actual = await getLatestBar(mockStockDataSource, 'AAPL')

      expect(actual.S).toBe('AAPL')
    })

    it('should add t property to be parsed to 1,000th of a second', async () => {
      const actual = await getLatestBar(mockStockDataSource, 'AAPL')

      expect(actual.t).toBe('2020-01-01T12:00:00.666Z')
    })
  })

  describe('for crypto market data source', () => {
    const mockCryptoBar: RawBar = {
      symbol: 'BTCUSD',
      bar: {
        o: 100,
        h: 100,
        l: 100,
        c: 100,
        v: 1_000,
        x: 'CBSE',
        t: '2020-01-01T12:00:00.666666Z',
      },
    }

    const mockCryptoDataSource: jest.Mocked<MarketDataSource> = {
      get: jest.fn().mockResolvedValue(mockCryptoBar),
      type: MarketDataClass.crypto,
    }

    it('should throw error if exchange is not provided', async () => {
      await expect(async () => {
        await getLatestBar(mockCryptoDataSource, 'BTCUSD')
      }).rejects.toThrowError('Exchange is required for crypto market data')
    })

    it('should invoke market data with correct args', async () => {
      await getLatestBar(mockCryptoDataSource, 'BTCUSD', 'CBSE')
      expect(mockCryptoDataSource.get).toHaveBeenCalledWith(
        '/BTCUSD/bars/latest',
        {
          exchange: 'CBSE',
        },
      )
    })

    it('should add S property containing symbol', async () => {
      const actual = await getLatestBar(mockCryptoDataSource, 'BTCUSD', 'CBSE')

      expect(actual.S).toBe('BTCUSD')
    })

    it('should add t property to be parsed to 1,000th of a second', async () => {
      const actual = await getLatestBar(mockCryptoDataSource, 'BTCUSD', 'CBSE')

      expect(actual.t).toBe('2020-01-01T12:00:00.666Z')
    })
  })
})
