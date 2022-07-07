import { cleanString } from '@/helpers/cleanString'

describe('cleanString', () => {
  type TestCase = {
    value: string | undefined | null
    expected: string
  }

  const testCases: TestCase[] = [
    {
      value: '',
      expected: '',
    },
    {
      value: '   ',
      expected: '',
    },
    {
      value: undefined,
      expected: '',
    },
    {
      value: null,
      expected: '',
    },
    {
      value: '   FOO  ',
      expected: 'FOO',
    },
    {
      value: 'FOO  ',
      expected: 'FOO',
    },
    {
      value: '    FOO',
      expected: 'FOO',
    },
  ]

  test.each(testCases)(
    'Clean "$value", expect "$expected"',
    (testCase: TestCase) => {
      const actual = cleanString(testCase.value)
      expect(actual).toBe(testCase.expected)
    },
  )

  test('should throw if value is not a permitted type', () => {
    // eslint-disable-next-line
    // @ts-ignore
    expect(() => cleanString(123)).toThrow(
      'Unable to clean string value.  Unsupported value type of "number" with value "123"',
    )
  })
})
