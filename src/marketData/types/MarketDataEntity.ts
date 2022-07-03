/**
 * Trade, Bar and Quote are all MarketDataEntity types.
 */
export interface MarketDataEntity {
  [x: string]: unknown

  S?: string
  t: string
}
