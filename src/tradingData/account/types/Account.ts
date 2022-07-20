import { AccountStatus } from '@/tradingData/account/types/AccountStatus'

/**
 * @group Trading Data
 * @category Account
 * @remarks Similar to [Account Model](https://alpaca.markets/docs/api-references/trading-api/account/#account-model), but with the following differences:
 * - `status` is converted to an `AccountStatus` enum
 * - `crypto_status` is converted to an `AccountStatus` enum
 * - `buying_power` is converted to a number
 * - `daytrading_buying_power` is converted to a number
 * - `regt_buying_power` is converted to a number
 * - `non_marginable_buying_power` is converted to a number
 * - `cash` is converted to a number
 * - `accrued_fees` is converted to a number
 * - `pending_transfer_in` is converted to a number
 * - `portfolio_value` is converted to a number
 * - `multiplier` is converted to a number
 * - `equity` is converted to a number
 * - `last_equity` is converted to a number
 * - `long_market_value` is converted to a number
 * - `short_market_value` is converted to a number
 * - `initial_margin` is converted to a number
 * - `last_maintenance_margin` is converted to a number
 * - `maintenance_margin` is converted to a number
 * - `sma` is converted to a number
 * - `created_at` is converted to a Date object
 */
export interface Account {
  account_blocked: boolean
  account_number: string
  buying_power: number
  status: AccountStatus
  crypto_status: AccountStatus
  cash: number
  created_at: Date
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
