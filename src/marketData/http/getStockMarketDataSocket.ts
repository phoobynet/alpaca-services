import { MarketDataSocket } from './MarketDataSocket'

const STOCK_MARKET_DATA_SOCKET_URL = 'wss://stream.data.alpaca.markets/v2/sip'

export const getStockMarketDataSocket = (): MarketDataSocket => {
  return MarketDataSocket.getByUrl(STOCK_MARKET_DATA_SOCKET_URL)
}
