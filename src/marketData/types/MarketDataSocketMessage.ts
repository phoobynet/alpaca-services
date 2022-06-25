import { MarketDataSocketMessage } from './ReceivedMessageType'

export interface MarketDataSocketMessage extends Record<string, unknown> {
  T: MarketDataSocketMessage
  msg?: string
  error?: number
  S?: string
  t?: string
}
