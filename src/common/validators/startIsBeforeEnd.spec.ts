import { validDate } from './validDate'
import { isDateBeforeOrEqualTo } from '../helpers/isDateEqualOrBefore'

const { startIsBeforeEnd } = jest.requireActual('./startIsBeforeEnd')

describe('startIsBeforeEnd', () => {
  test('argument validation', () => {
    const start = new Date('2020-01-01')
    const end = new Date('2020-01-01')

    startIsBeforeEnd(start, end)

    expect((validDate as jest.Mock).mock.calls).toEqual([[start], [end]])
  })

  const testCases = [[]]

  test('should throw if start is not before end', () => {
    const start = new Date('2020-01-01 12:00:00')
    const end = new Date('2020-01-01 11:59:59')

    expect(() => startIsBeforeEnd(start, end)).toThrow(
      'end datetime cannot be before start datetime',
    )
  })
})
