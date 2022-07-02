import { options } from './options'

describe('options', () => {
  beforeEach(() => {
    jest.resetModules()
  })
  it('should throw an error if options are not set', () => {
    expect(() => {
      options.get()
    }).toThrowError('Options not set')
  })

  it('should return the options', () => {
    options.set({
      key: 'key',
      secret: 'secret',
      paper: true,
    })

    expect(options.get()).toEqual({
      key: 'key',
      secret: 'secret',
      paper: true,
    })
  })

  it('should throw an error if options.key is invalid', () => {
    expect(() => {
      options.set({
        key: '',
        secret: 'secret',
        paper: true,
      })
    }).toThrowError('options.key is invalid')
  })

  it('should throw an error if options.secret is invalid', () => {
    expect(() => {
      options.set({
        key: 'key',
        secret: '   ',
        paper: true,
      })
    }).toThrowError('options.secret is invalid')
  })

  it('should throw an error if options.secret is shorter than the length of options.key', () => {
    expect(() => {
      options.set({
        key: 'HOIH123IOH23WEFWEFWEFWEF',
        secret: 'OIWNEFOIWNE',
        paper: true,
      })
    }).toThrowError(
      'options.secret is shorted than options.key, which is not correct.',
    )
  })

  it('should display a warning if paper trading is enabled', () => {
    const logSpy = jest.spyOn(console, 'warn')

    options.set({
      key: 'key',
      secret: 'secret',
      paper: true,
    })

    const expected =
      String.fromCodePoint(0x1f4f0) + ' Paper trading is enabled.'

    expect(logSpy).toHaveBeenCalledWith(expected)
  })
})
