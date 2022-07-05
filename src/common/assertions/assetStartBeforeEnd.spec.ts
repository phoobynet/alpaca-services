import { assertDate } from './assertDate'

const { assertStartBeforeEnd } = jest.requireActual('./assertStartBeforeEnd')

describe('assertStartBeforeEnd', () => {
  test('if start date is before end date, do not throw', () => {
    expect(() => {
      assertStartBeforeEnd(new Date('2020-01-01'), new Date('2020-01-02'))
    }).not.toThrow()
  })

  test('if start date is after end date, throw', () => {
    expect(() => {
      assertStartBeforeEnd(
        new Date('2020-01-01 00:00:01'),
        new Date('2020-01-01'),
      )
    }).toThrow('Start date must be before end date')
  })

  test('should validate start and end dates', () => {
    const start = new Date('2020-01-01')
    const end = new Date('2020-01-02')
    assertStartBeforeEnd(start, end)
    expect(assertDate).toHaveBeenNthCalledWith(1, start)
    expect(assertDate).toHaveBeenNthCalledWith(2, end)
  })
})
