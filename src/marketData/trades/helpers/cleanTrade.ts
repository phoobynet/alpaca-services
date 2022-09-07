import { RawTrade, Trade } from '../types'
import { cleanMarketDataEntity } from '../../helpers'

export const cleanTrade = (
  trade: RawTrade | Trade | undefined,
  symbol = '',
): Trade => {
  if (trade === undefined) {
    throw new Error('Trade is undefined')
  }

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
