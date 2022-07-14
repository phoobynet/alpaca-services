import { MarketDataEntity } from '@/marketData/types'

const { cleanTimestamp } = jest.requireActual(
  '@/marketData/helpers/cleanTimestamp',
)

describe('cleanTimestamp', () => {
  test('should clean the timestamp', () => {
    const marketDataEntity: MarketDataEntity = {
      t: '2020-01-01T00:00:00.66666Z',
      p: 123,
      s: 122,
      S: 'AAPL',
    }

    const expected: MarketDataEntity = {
      ...marketDataEntity,
      t: '2020-01-01T00:00:00.666Z',
    }

    const actual = cleanTimestamp(marketDataEntity)
    expect(actual).toStrictEqual(expected)
  })

  test('throws if t value is not a valid date string', () => {
    const marketDataEntity: MarketDataEntity = {
      t: 'foobar',
      p: 123,
      s: 122,
      S: 'AAPL',
    }
    expect(() => {
      cleanTimestamp(marketDataEntity)
    }).toThrow('Invalid .t value cannot be parsed using ISO format')
  })

  test('should return a clone of the entity', () => {
    const marketDataEntity: MarketDataEntity = {
      t: '2020-01-01T00:00:00.66666Z',
      p: 123,
      s: 122,
      S: 'AAPL',
    }

    const actual = cleanTimestamp(marketDataEntity)

    expect(actual).not.toBe(marketDataEntity)
  })
})
