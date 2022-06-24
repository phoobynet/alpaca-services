import { Asset } from '../types'
import { getTradingData } from '../../http'

export const getAssets = (): Promise<Asset[]> => {
  return getTradingData<Asset[]>('/assets')
}
