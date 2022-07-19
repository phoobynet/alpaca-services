import { MarketDataSocket } from '@/marketData/http/MarketDataSocket'

const CRYPTO_MARKET_DATA_SOCKET_URL =
  'wss://stream.data.alpaca.markets/v1beta1/crypto'

/**
 * @internal
 * @group Market Data
 * @category HTTP
 */
export const getCryptoMarketDataSocket = (): MarketDataSocket =>
  MarketDataSocket.getByUrl(CRYPTO_MARKET_DATA_SOCKET_URL)
