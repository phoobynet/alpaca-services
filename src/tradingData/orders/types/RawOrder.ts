/**
 * @internal
 * @group Market Data
 * @category Order
 */
export interface RawOrder {
  id: string
  client_order_id: string
  created_at: string
  updated_at: string
  submitted_at: string
  filled_at?: string
  expired_at?: string
  canceled_at?: string
  failed_at?: string
  replaced_at?: string
  replaced_by?: string
  replaces?: string
  asset_id: string
  symbol: string
  asset_class: string
  notional?: string
  qty?: string
  filled_qty: string
  filled_avg_price?: string
  order_class: string
  order_type: string
  type: string
  side: string
  time_in_force: string
  limit_price?: string
  stop_price?: string
  status: string
  extended_hours: boolean
  legs?: RawOrder[]
  trail_percent?: string
  trail_price?: string
  hwm?: string
}
