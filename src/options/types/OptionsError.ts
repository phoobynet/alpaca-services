import { Options } from '@/options'

/**
 * @group Options
 */
export class OptionsError extends Error {
  constructor(message: string, public options: Options) {
    super(message)
    this.name = 'OptionsError'
  }
}
