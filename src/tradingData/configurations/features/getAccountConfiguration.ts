import { AccountConfiguration } from '../types'
import { getTradeData } from '../../http'

export const getAccountConfiguration =
  async (): Promise<AccountConfiguration> => {
    const httpResponse = await getTradeData<AccountConfiguration>(
      '/account/configurations',
    )

    if (httpResponse.ok) {
      return httpResponse.data as AccountConfiguration
    } else {
      throw new Error(httpResponse.message)
    }
  }
