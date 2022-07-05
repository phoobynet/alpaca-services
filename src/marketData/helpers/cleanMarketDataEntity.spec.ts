import { MarketDataEntity } from '../types'
import { cleanSymbol } from '../../common'
import { cleanTimestamp } from './cleanTimestamp'

const { cleanMarketDataEntity } = jest.requireActual('./cleanMarketDataEntity')

describe('cleanMarketDataEntity', () => {
  test('should clean timestamp', () => {
    const entity: MarketDataEntity = {
      t: '2020-01-01T00:00:00.666777Z',
    }

    ;(cleanTimestamp as jest.Mock).mockReturnValueOnce({
      t: '2020-01-01T00:00:00.666Z',
    })

    cleanMarketDataEntity(entity, 'BTCUSD')

    expect(cleanTimestamp).toHaveBeenCalledWith(entity)
  })

  test('should clean symbol when entity has no .S property and a symbol is supplied', () => {
    const entity: MarketDataEntity = {
      t: '2020-01-01T00:00:00.666777Z',
    }

    ;(cleanTimestamp as jest.Mock).mockReturnValueOnce({
      t: '2020-01-01T00:00:00.666Z',
    })

    cleanMarketDataEntity(entity, 'BTCUSD')

    expect(cleanSymbol).toHaveBeenCalledWith('BTCUSD')
  })

  test('should clean symbol when entity has an .S property and ignore any supplied symbol', () => {
    const entity: MarketDataEntity = {
      t: '2020-01-01T00:00:00.666777Z',
      S: 'BTCUSD',
    }

    ;(cleanTimestamp as jest.Mock).mockReturnValueOnce({
      t: '2020-01-01T00:00:00.666Z',
      S: 'BTCUSD',
    })

    cleanMarketDataEntity(entity, 'ETHUSD')

    expect(cleanSymbol).toHaveBeenCalledWith('BTCUSD')
  })

  test('should throw if entity has no .S property and no symbol is supplied', () => {
    const entity: MarketDataEntity = {
      t: '2020-01-01T00:00:00.666777Z',
    }

    ;(cleanTimestamp as jest.Mock).mockReturnValueOnce({
      t: '2020-01-01T00:00:00.666Z',
    })

    expect(() => cleanMarketDataEntity(entity)).toThrow(
      'Entity does not have an existing .S property and no symbol was supplied',
    )
  })
})
