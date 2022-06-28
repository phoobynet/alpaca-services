import { filteredWithRemaining } from './filteredWithRemaining'

describe('filteredWithRemaining', () => {
  it('should correctly filter and return the remaining values', () => {
    const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

    const filter = (t: number) => t % 2 === 0

    const [filtered, remaining] = filteredWithRemaining(arr, filter)

    expect(filtered).toEqual([2, 4, 6, 8, 10])
    expect(remaining).toEqual([1, 3, 5, 7, 9])
  })
})
