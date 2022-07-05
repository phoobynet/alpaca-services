import { Clock, RawClock } from '../types'
import { getTradeData } from '../../http'
import { cleanClock } from '../helpers'

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
