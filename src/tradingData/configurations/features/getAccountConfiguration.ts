import { AccountConfiguration } from '../types'
import { getTradeData } from '../../http'

export const getAccountConfiguration =
  async (): Promise<AccountConfiguration> =>
    getTradeData<AccountConfiguration>('/account/configurations')
