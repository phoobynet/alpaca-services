const { cleanSymbol } = jest.requireActual('./cleanSymbol')
import { cleanString } from './cleanString'

describe('cleanSymbol', () => {
  describe('validation', () => {
    test('should invoke cleanString', () => {
      ;(cleanString as jest.Mock).mockImplementationOnce(() => 'FOO')
      cleanSymbol('FOO')
      expect(cleanString).toHaveBeenCalledWith('FOO')
    })
  })

  describe('cleanSymbol symbol arg is valid', () => {
    type TestCase = {
      symbol: string
      expected: string
    }
    const testCases: Array<TestCase> = [
      {
        symbol: 'aapl',
        expected: 'AAPL',
      },
      {
        symbol: 'AAPL',
        expected: 'AAPL',
      },
    ]

    test.each(testCases)(
      'Should convert $symbol to $expected',
      (testCase: TestCase) => {
        ;(cleanString as jest.Mock).mockImplementationOnce(
          () => testCase.symbol,
        )
        expect(cleanSymbol(testCase.symbol)).toBe(testCase.expected)
      },
    )
  })

  test('should throw if symbol is empty', () => {
    ;(cleanString as jest.Mock).mockImplementationOnce(() => '')
    expect(() => cleanSymbol('')).toThrow(
      'symbol arg must be a non-empty string',
    )
  })
})
