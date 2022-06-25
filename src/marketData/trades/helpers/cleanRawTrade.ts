import { RawTrade, Trade } from '../types'
import { cleanTrade } from './cleanTrade'

export const cleanRawTrade = (rawTrade: RawTrade): Trade => {
  return cleanTrade({
    ...rawTrade.trade,
    S: rawTrade.symbol,
  })
}
