import { MarketDataSocketMessageType } from '@/marketData/types'

/**
 * @internal
 * @group Market Data
 * @category HTTP
 */
export interface MarketDataSocketMessage extends Record<string, unknown> {
  T: MarketDataSocketMessageType
  msg?: string
  error?: number
  S?: string
  t?: string
}
