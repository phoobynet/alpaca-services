import { MarketDataSocket } from '@/marketData/http/MarketDataSocket'

const CRYPTO_SOCKET_URL = 'wss://stream.data.alpaca.markets/v1beta2/crypto'

/**
 * @internal
 * @group Market Data
 * @category HTTP
 */
export const getCryptoSocket = (): MarketDataSocket =>
  MarketDataSocket.getByUrl(CRYPTO_SOCKET_URL)
