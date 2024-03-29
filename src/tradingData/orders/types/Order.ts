/**
 * @group Market Data
 * @category Orders
 */
export interface Order {
  id: string
  client_order_id: string
  created_at: Date
  updated_at: Date
  submitted_at: Date
  filled_at?: Date
  expired_at?: Date
  canceled_at?: Date
  failed_at?: Date
  replaced_at?: Date
  replaced_by?: string
  replaces?: string
  asset_id: string
  symbol: string
  asset_class: string
  notional?: number
  qty?: number
  filled_qty: number
  filled_avg_price?: number
  order_class: string
  order_type: string
  type: string
  side: string
  time_in_force: string
  limit_price?: number
  stop_price?: number
  status: string
  extended_hours: boolean
  legs?: Order[]
  trail_percent?: number
  trail_price?: number
  hwm?: number
}
