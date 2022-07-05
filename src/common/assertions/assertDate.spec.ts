const { assertDate } = jest.requireActual('./assertDate')

describe('assertDate', () => {
  test('should throw if date is not valid', () => {
    const date = new Date('invalid')
    expect(() => assertDate(date)).toThrow('date is not a valid date')
  })
})
