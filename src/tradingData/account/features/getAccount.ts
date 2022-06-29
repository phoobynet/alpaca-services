import { Account, RawAccount } from '../types'
import { getTradeData } from '../../http'
import { cleanAccount } from '../helpers'

export const getAccount = async (): Promise<Account> =>
  getTradeData<RawAccount>('/account').then(cleanAccount)
