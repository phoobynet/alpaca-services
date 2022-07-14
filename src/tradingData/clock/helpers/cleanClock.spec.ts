import { cleanClock } from './cleanClock'
import { RawClock } from '../types'

describe('cleanClock', () => {
  it('should clean clock', () => {
    const rawClock: RawClock = {
      timestamp: '2020-01-01T00:00:00.000Z',
      is_open: true,
      next_open: '2020-01-01T01:00:00.000Z',
      next_close: '2020-01-01T02:00:00.000Z',
    }

    const actual = cleanClock(rawClock)
    expect(actual).toEqual({
      timestamp: new Date('2020-01-01T00:00:00.000Z'),
      is_open: true,
      next_open: new Date('2020-01-01T01:00:00.000Z'),
      next_close: new Date('2020-01-01T02:00:00.000Z'),
    })
  })
})
