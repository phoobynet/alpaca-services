import { isDateEqual } from './isDateEqual'

describe('isDateEqual', () => {
  const testCases: Array<[Date, Date, boolean]> = [
    [
      new Date('2020-01-01T00:00:00.000Z'),
      new Date('2020-01-01T00:00:00.000Z'),
      true,
    ],
    [
      new Date('2020-01-01T01:00:00.000Z'),
      new Date('2020-01-01T00:00:00.000Z'),
      true,
    ],
    [
      new Date('2021-01-01T00:00:00.000Z'),
      new Date('2020-01-01T00:00:00.000Z'),
      false,
    ],
  ]

  test.each(testCases)('is %p === %p = %p', (d1, d2, expected) => {
    expect(isDateEqual(d1, d2)).toBe(expected)
  })
})
