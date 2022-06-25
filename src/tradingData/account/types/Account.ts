import { AccountStatus } from './AccountStatus'

export interface Account {
  account_blocked: boolean
  account_number: string
  buying_power: number
  status: AccountStatus
  crypto_status: AccountStatus
  cash: number
  created_at: string
  currency: string
  daytrade_count: number
  daytrading_buying_power: number
  non_marginable_buying_power: number
  accrued_fees: number
  pending_transfer_in: number
  equity: number
  id: string
  initial_margin: number
  last_equity: number
  last_maintenance_margin: number
  long_market_value: number
  maintenance_margin: number
  multiplier: number
  pattern_day_trader: boolean
  portfolio_value: number
  regt_buying_power: number
  short_market_value: number
  shorting_enabled: boolean
  sma: number
  trade_suspended_by_user: boolean
  trading_blocked: boolean
  transfers_blocked: boolean
}
