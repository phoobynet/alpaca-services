import { getTradeData } from '@/tradingData/http'
import { cleanClock } from '@/tradingData/clock/helpers'
import { Clock, RawClock } from '@/tradingData/clock/types'

/**
 * @group Trading Data
 * @category Clock
 */
export const getClock = async (): Promise<Clock | undefined> => {
  const httpResponse = await getTradeData<RawClock>('/clock')

  if (httpResponse.ok) {
    if (httpResponse.data) {
      return cleanClock(httpResponse.data)
    }

    return undefined
  } else {
    throw new Error(httpResponse.message)
  }
}
