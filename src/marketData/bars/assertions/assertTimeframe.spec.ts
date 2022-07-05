import { isValidTimeframe } from '../helpers'

const { assertTimeframe } = jest.requireActual('./assertTimeframe')

const isValidTimeframeMock = isValidTimeframe as jest.Mock

describe('assertTimeframe', () => {
  test('should invoke isValidTimeframe', () => {
    isValidTimeframeMock.mockReturnValueOnce(true)
    assertTimeframe('1Min')
    expect(isValidTimeframe).toHaveBeenCalledWith('1Min')
  })

  test('should throw if timeframe is not valid', () => {
    isValidTimeframeMock.mockReturnValueOnce(false)
    expect(() => assertTimeframe('blah')).toThrow(
      'Invalid timeframe, expected something like 1Min, 1Hour, 1Day, 1Week, 1Year etc., but got blah',
    )
  })
})
