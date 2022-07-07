import { cleanString } from '@/helpers/cleanString'
import { cleanSymbol } from '@/helpers'

jest.mock('@/helpers/cleanString')

const cleanStringMock = cleanString as jest.Mock

describe('cleanSymbol', () => {
  describe('validation', () => {
    test('should invoke cleanString', () => {
      cleanStringMock.mockImplementationOnce(() => 'FOO')
      cleanSymbol('FOO')
      expect(cleanStringMock).toHaveBeenCalledWith('FOO')
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
        cleanStringMock.mockImplementationOnce(() => testCase.symbol)
        expect(cleanSymbol(testCase.symbol)).toBe(testCase.expected)
      },
    )
  })

  test('should throw if symbol is empty', () => {
    cleanStringMock.mockImplementationOnce(() => '')
    expect(() => cleanSymbol('')).toThrow(
      'symbol arg must be a non-empty string',
    )
  })
})
