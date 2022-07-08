import { MarketDataEntity } from '../types'
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
