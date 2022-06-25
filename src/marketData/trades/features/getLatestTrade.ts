import { MarketDataSource } from '../../types'
import { RawTrade, Trade } from '../types'
import { cleanSymbol } from '../../../common'
import { cleanRawTrade } from '../helpers'

export const getLatestTrade = async (
  marketDataSource: MarketDataSource,
  symbol: string,
): Promise<Trade> =>
  marketDataSource<RawTrade>(`${cleanSymbol(symbol)}/trades/latest`).then(
    cleanRawTrade,
  )
