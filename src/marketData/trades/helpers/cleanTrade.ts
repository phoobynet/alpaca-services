import { Trade } from '../types'
import { cleanMarketDataEntity } from '../../helpers'

export const cleanTrade = (trade: Trade, symbol = ''): Trade => {
  return cleanMarketDataEntity(trade, symbol)
}
