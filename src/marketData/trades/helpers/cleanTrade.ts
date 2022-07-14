import { RawTrade, Trade } from '../types'
import { cleanMarketDataEntity } from '../../helpers'

export const cleanTrade = (trade: RawTrade | Trade, symbol = ''): Trade => {
  let result: Trade

  if ('trade' in trade) {
    const rawTrade = trade as RawTrade
    result = {
      ...rawTrade.trade,
      S: rawTrade.symbol || symbol,
    }
  } else {
    result = {
      ...trade,
    }
  }

  return cleanMarketDataEntity(result, symbol)
}
