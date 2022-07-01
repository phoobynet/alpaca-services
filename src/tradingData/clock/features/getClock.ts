import { Clock, RawClock } from '../types'
import { getTradeData } from '../../http'
import { cleanClock } from '../helpers'

export const getClock = async (): Promise<Clock> =>
  getTradeData<RawClock>('/clock').then(cleanClock)
