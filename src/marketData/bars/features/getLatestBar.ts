import { Bar, RawBar } from '../types'
import { cleanRawBar } from '../helpers'
import { cleanTimestamp } from '../../helpers'
import { getMarketData } from '../../http'

export const getLatestBar = (symbol: string): Promise<Bar> => {
  return getMarketData<RawBar>(`/stocks/${symbol}/bars/latest`)
    .then(cleanRawBar)
    .then(cleanTimestamp)
}
