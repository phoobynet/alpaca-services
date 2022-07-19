import { AccountConfiguration } from '@/tradingData/configurations/types/AccountConfiguration'
import { getTradeData } from '@/tradingData/http'

/**
 * @group Trading Data
 * @category Configuration
 */
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
