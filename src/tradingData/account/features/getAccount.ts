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
export const getAccount = async (): Promise<Account> => {
  const httpResponse = await getTradeData<RawAccount>('/account')

  if (httpResponse.ok) {
    return cleanAccount(httpResponse.data as RawAccount)
  } else {
    throw new Error(httpResponse.message)
  }
}
