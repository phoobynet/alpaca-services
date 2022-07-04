import { validDate } from './validDate'

describe('validDate', () => {
  test('should throw if date is not valid', () => {
    const date = new Date('invalid')
    expect(() => validDate(date)).toThrow('date is not a valid date')
  })
})
