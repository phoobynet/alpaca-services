import { MarketDataEntity } from '../types'

const { cleanTimestamp } = jest.requireActual('./cleanTimestamp')

describe('cleanTimestamp', () => {
  it('should clean the timestamp', () => {
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
})
