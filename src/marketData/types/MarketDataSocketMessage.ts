import { MarketDataSocketMessageType } from './MarketDataSocketMessageType'

export interface MarketDataSocketMessage extends Record<string, unknown> {
  T: MarketDataSocketMessageType
  msg?: string
  error?: number
  S?: string
  t?: string
}
