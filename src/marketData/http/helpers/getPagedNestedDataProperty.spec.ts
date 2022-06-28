import { getPagedNestedDataProperty } from './getPagedNestedDataProperty'

describe('getPagedNestedDataProperty', () => {
  describe('errors', () => {
    it('No nested data properties', () => {
      const data = {
        next_page_token: 'whatever',
      }

      expect(() => {
        getPagedNestedDataProperty(data)
      }).toThrow('No nested data properties')
    })

    it('Too many nested data properties', () => {
      const data = {
        trade: '',
        quote: '',
        next_page_token: 'whatever',
      }

      expect(() => {
        getPagedNestedDataProperty(data)
      }).toThrow('Too many nested data properties')
    })

    it('Unable to determine nested data property', () => {
      const data = {
        '': '',
        next_page_token: 'whatever',
      }

      expect(() => {
        getPagedNestedDataProperty(data)
      }).toThrow('Unable to determine nested data property')
    })
  })

  it('should return a nested data property', () => {
    const data = {
      trade: '',
      next_page_token: 'whatever',
    }
    const actual = getPagedNestedDataProperty(data)
    expect(actual).toBe('trade')
  })
})
