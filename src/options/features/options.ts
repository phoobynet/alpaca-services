import { Options, OptionsError } from '../types'
import { assetRepository } from '@/tradingData/assets/features/assetRepository'
import { APCA_TRADING_BASE_URL } from '@/options/defaults/APCA_TRADING_BASE_URL'
import { APCA_PAPER_TRADING_BASE_URL } from '@/options/defaults/APCA_PAPER_TRADING_BASE_URL'

let _options: Options

/**
 * @group Options
 */
export const options = {
  /**
   * @returns {Options}
   * @throws {Error} if options have not been set
   */
  get(): Options {
    if (!_options) {
      throw new Error('Options not set')
    }

    return _options
  },

  /**
   * Patch existing options state
   */
  patch(options: Partial<Options>): void {
    this.set({
      ..._options,
      ...options,
    })
  },
  /**
   * Sets the options globally
   * @param {Options} options
   * @throws {OptionsError} if options are invalid
   */
  set(options: Options) {
    const accessToken = (options.accessToken || '').trim()

    if (!accessToken) {
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
    }

    if (options.paper) {
      const paper = String.fromCodePoint(0x1f4f0)
      // trading base URL can be passed in, taken from the environment, or defaulted
      options.tradingBaseUrl =
        options.tradingBaseUrl || APCA_PAPER_TRADING_BASE_URL
      console.info(
        `${paper} PAPER trading is enabled using "${options.tradingBaseUrl}".`,
      )
    } else {
      const lightning = String.fromCodePoint(0x26a1)
      options.tradingBaseUrl = options.tradingBaseUrl || APCA_TRADING_BASE_URL
      console.info(
        `${lightning} LIVE trading is enabled using "${options.tradingBaseUrl}".`,
      )
    }

    // When no external asset repository is provided, use the default one
    if (!options.assetRepository) {
      options.assetRepository = assetRepository
    }

    _options = options
  },
}
