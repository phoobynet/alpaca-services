import { MarketDataSocket } from './MarketDataSocket'

const CRYPTO_MARKET_DATA_SOCKET_URL =
  'wss://stream.data.alpaca.markets/v1beta1/crypto'

export const getCryptoMarketDataSocket = (): MarketDataSocket => {
  return MarketDataSocket.getByUrl(CRYPTO_MARKET_DATA_SOCKET_URL)
}
