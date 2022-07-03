import { Account, RawAccount } from '../types'
import { getTradeData } from '../../http'
import { cleanAccount } from '../helpers'

/**
 * Get the account information
 * @group Trading Data
 * @category Account
 * @example
 * ```ts
 * const account = await getAccount()
 * ```
 */
export const getAccount = async (): Promise<Account> =>
  getTradeData<RawAccount>('/account').then(cleanAccount)
