import { Account, RawAccount } from '../types'
import { getTradingData } from '../../http'
import { cleanAccount } from '../helpers'

export const getAccount = async (): Promise<Account> =>
  getTradingData<RawAccount>('/account').then(cleanAccount)
