import { RawTrade, Trade } from '../types'
import { cleanMarketDataEntity } from '../../helpers'

export const cleanTrade = (trade: RawTrade | Trade, symbol = ''): Trade => {
  const isRawTrade = 'trade' in trade

  if (isRawTrade) {
    return cleanTrade({
      ...trade.trade,
      S: symbol || trade.symbol,
    })
  }

  if (!symbol) {
    throw new Error('Symbol is required to clean a Trade')
  }

  return cleanMarketDataEntity(trade, symbol)
}
