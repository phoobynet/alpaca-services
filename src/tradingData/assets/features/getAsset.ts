import { Asset } from '../types'
import { getTradingData } from '../../http'
import { cleanSymbol } from '../../../common'

export const getAsset = (symbol: string): Promise<Asset> => {
  symbol = cleanSymbol(symbol)
  return getTradingData<Asset>(`/assets/${symbol}`)
}
