import { formatISODate } from '@/helpers'

describe('formatISODate', () => {
  it('should correctly format using a date representation', function () {
    const date = new Date('2020-01-01T00:00:00.000Z')
    const formatted = formatISODate(date)
    expect(formatted).toBe('2020-01-01')
  })
})
