import { Account, RawAccount } from '../types'
import { getTradeHttpClient } from '../../http'
import { cleanAccount } from '../helpers'

export const getAccount = async (): Promise<Account> =>
  getTradeHttpClient().get<RawAccount>('/account').then(cleanAccount)
