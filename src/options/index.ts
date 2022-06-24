import { Options } from './types'

let _options: Options

export const options = {
  get(): Options {
    if (!options) {
      throw new Error('Options not set')
    }

    return _options
  },
  set(options: Options) {
    _options = options
  },
}
