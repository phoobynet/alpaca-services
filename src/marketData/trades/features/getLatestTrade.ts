import { RawTrade, Trade } from '@/marketData/trades/types'
import { cleanTrade } from '@/marketData/trades/helpers'
import { cleanSymbol, getSource, isCryptoSource } from '@/marketData/helpers'

/**
 * @group Market Data
 * @category Trades
 * @param {string} symbol
 */
export const getLatestTrade = async (symbol: string): Promise<Trade> => {
  symbol = cleanSymbol(symbol)

  const queryParams: Record<string, string> = {}
  const source = await getSource(symbol)

  let url = `${symbol}/trades/latest`

  if (isCryptoSource(source)) {
    url = '/latest/trades'
    queryParams.symbols = symbol
    return source
      .get<{ trades: Record<string, Trade> }>(url, queryParams)
      .then((data) => cleanTrade(data.trades[symbol]))
  } else {
    return source.get<RawTrade>(url, queryParams).then(cleanTrade)
  }
}
