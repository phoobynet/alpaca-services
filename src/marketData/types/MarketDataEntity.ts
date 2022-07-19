/**
 * Trade, Bar and Quote are all MarketDataEntity types.
 * @group Market Data
 * @category Types
 */
export interface MarketDataEntity {
  [x: string]: unknown

  S?: string
  t: string
}
