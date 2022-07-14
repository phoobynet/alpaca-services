const { getPagedNestedDataProperty } = jest.requireActual(
  '@/marketData/http/helpers/getPagedNestedDataProperty',
)

describe('getPagedNestedDataProperty', () => {
  describe('errors', () => {
    test('No nested data properties', () => {
      const data = {
        next_page_token: 'whatever',
      }

      expect(() => {
        getPagedNestedDataProperty(data)
      }).toThrow('No nested data properties')
    })

    test('Too many nested data properties', () => {
      const data = {
        trade: '',
        quote: '',
        next_page_token: 'whatever',
      }

      expect(() => {
        getPagedNestedDataProperty(data)
      }).toThrow('Too many nested data properties')
    })

    test('Unable to determine nested data property', () => {
      const data = {
        '': '',
        next_page_token: 'whatever',
      }

      expect(() => {
        getPagedNestedDataProperty(data)
      }).toThrow('Unable to determine nested data property')
    })
  })

  test('should return a nested data property', () => {
    const data = {
      trade: '',
      next_page_token: 'whatever',
    }
    const actual = getPagedNestedDataProperty(data)
    expect(actual).toBe('trade')
  })
})
