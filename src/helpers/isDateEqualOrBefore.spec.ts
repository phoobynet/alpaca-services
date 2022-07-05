const { isDateBeforeOrEqualTo } = jest.requireActual('./isDateEqualOrBefore')

describe('isDateEqualOrBefore', () => {
  const testCases = [
    [
      new Date('2020-01-01 14:00:00'),
      new Date('2020-01-01 12:00:00'),
      'date',
      true,
    ],
    [new Date('2020-01-02'), new Date('2020-01-01 12:00:00'), 'date', false],
    [
      new Date('2020-01-01 14:00:00'),
      new Date('2020-01-01 14:00:00'),
      'datetime',
      true,
    ],
    [
      new Date('2020-01-01 13:00:00'),
      new Date('2020-01-01 14:00:00'),
      'datetime',
      true,
    ],
    [
      new Date('2020-01-01 12:00:01'),
      new Date('2020-01-01 12:00:00'),
      'datetime',
      false,
    ],
  ]

  test.each(testCases)(
    'is %p <= %p where level is %p: %p',
    (start, end, level, expected) => {
      expect(isDateBeforeOrEqualTo(start, end, level)).toBe(expected)
    },
  )

  test('throw if d1 is not a date', () => {
    expect(() =>
      isDateBeforeOrEqualTo('not a date', new Date(), 'date'),
    ).toThrow('Expected dates got something else')
  })

  test('throw if d2 is not a date', () => {
    expect(() =>
      isDateBeforeOrEqualTo(new Date(), 'not a date', 'date'),
    ).toThrow('Expected dates got something else')
  })

  test('throw if level is not the expected type', () => {
    expect(() => isDateBeforeOrEqualTo(new Date(), new Date(), 'bad')).toThrow(
      'Expected level to be either "date" or "datetime"',
    )
  })
})
