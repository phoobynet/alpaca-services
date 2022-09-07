import { MarketDataEntity } from '@/marketData'
import { cleanTimestamp } from '@/marketData/helpers'

const { cleanMarketDataEntity } = jest.requireActual(
  '@/marketData/helpers/cleanMarketDataEntity',
)

const cleanTimestampMock = cleanTimestamp as jest.Mock

describe('cleanMarketDataEntity', () => {
  test('should clean timestamp', () => {
    const entity: MarketDataEntity = {
      t: '2020-01-01T00:00:00.666777Z',
    }

    cleanTimestampMock.mockReturnValueOnce({
      t: '2020-01-01T00:00:00.666Z',
    })

    console.log(cleanTimestampMock.mock.calls)

    cleanMarketDataEntity(entity, 'BTC/USD')

    expect(cleanTimestamp).toHaveBeenCalledWith(entity)
  })

  test('should throw if entity has no .S property and no symbol is supplied', () => {
    const entity: MarketDataEntity = {
      t: '2020-01-01T00:00:00.666777Z',
    }

    cleanTimestampMock.mockReturnValueOnce({
      t: '2020-01-01T00:00:00.666Z',
    })

    expect(() => cleanMarketDataEntity(entity)).toThrow(
      'Entity does not have an existing .S property and no symbol was supplied',
    )
  })
})
