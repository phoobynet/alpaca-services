import { Options } from '../types'

let _options: Options

export const options = {
  get(): Options {
    if (!options) {
      throw new Error('Options not set')
    }

    return _options
  },
  set(options: Options) {
    const key = (options.key || '').trim()

    if (!key) {
      throw new OptionsError('options.key is invalid', options)
    }

    const secret = (options.secret || '').trim()

    if (!secret) {
      throw new OptionsError('options.secret is invalid', options)
    }

    if (secret.length < key.length) {
      throw new OptionsError(
        'options.secret is shorted than options.key, which is not correct.',
        options,
      )
    }

    if (options.paper) {
      const paper = String.fromCodePoint(0x1f4f0)
      console.warn(paper + ' Paper trading is enabled.')
    }

    _options = options
  },
}

export class OptionsError extends Error {
  constructor(message: string, public options: Options) {
    super(message)
    this.name = 'OptionsError'
  }
}
