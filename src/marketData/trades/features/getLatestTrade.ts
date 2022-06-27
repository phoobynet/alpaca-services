import { MarketDataSource } from '../../types'
import { RawTrade, Trade } from '../types'
import { cleanSymbol } from '../../../common'
import { cleanTrade } from '../helpers'

export const getLatestTrade = async (
  marketDataSource: MarketDataSource,
  symbol: string,
): Promise<Trade> =>
  marketDataSource
    .get<RawTrade>(`${cleanSymbol(symbol)}/trades/latest`)
    .then(cleanTrade)
