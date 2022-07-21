import { MarketDataSocket } from '@/marketData/http/MarketDataSocket'

const URL = 'wss://stream.data.alpaca.markets/v1beta1/news'

export const getNewsSocket = (): MarketDataSocket =>
  MarketDataSocket.getByUrl(URL)
