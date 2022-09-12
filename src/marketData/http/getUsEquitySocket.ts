import { MarketDataSocket } from '@/marketData/http/MarketDataSocket'

const STOCK_MARKET_DATA_SOCKET_URL = 'wss://stream.data.alpaca.markets/v2/sip'

export const getUsEquitySocket = async (): Promise<MarketDataSocket> =>
  MarketDataSocket.getByUrl(STOCK_MARKET_DATA_SOCKET_URL)
