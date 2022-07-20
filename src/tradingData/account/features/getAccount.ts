import { Account, RawAccount } from '../types'
import { getTradeData } from '../../http'
import { cleanAccount } from '../helpers'

/**
 * Get the account information
 * @group Trading Data
 * @category Account
 * @see [Trading Account](https://alpaca.markets/docs/api-references/trading-api/account/)
 * @example
 * ```ts
 * const account = await getAccount()
 * ```
 *
 * ### Example response
 * Note that all `string<number>` fields have been converted to actual numbers fields
 * ```json
 * {
 *   "id": "57019a73-f4cd-415c-a0ae-xxxxxxxxxxxx",
 *   "account_number": "XXXXXXXX",
 *   "status": "ACTIVE",
 *   "crypto_status": "ACTIVE",
 *   "currency": "USD",
 *   "pattern_day_trader": false,
 *   "trading_blocked": false,
 *   "transfers_blocked": false,
 *   "account_blocked": false,
 *   "created_at": "2022-06-15T07:15:32.125Z",
 *   "trade_suspended_by_user": false,
 *   "shorting_enabled": true,
 *   "buying_power": 57895.98,
 *   "daytrading_buying_power": 0,
 *   "regt_buying_power": 57895.98,
 *   "non_marginable_buying_power": 28947.99,
 *   "cash": 28947.99,
 *   "accrued_fees": 0,
 *   "pending_transfer_in": 0,
 *   "portfolio_value": 30164.7336,
 *   "multiplier": 2,
 *   "equity": 30164.7336,
 *   "last_equity": 30154.8726,
 *   "long_market_value": 1216.7436,
 *   "short_market_value": 0,
 *   "initial_margin": 0,
 *   "last_maintenance_margin": 0,
 *   "maintenance_margin": 0,
 *   "sma": 28947.99,
 *   "daytrade_count": 0
 * }
 * ```
 */
export const getAccount = async (): Promise<Account> => {
  const httpResponse = await getTradeData<RawAccount>('/account')

  if (httpResponse.ok) {
    return cleanAccount(httpResponse.data as RawAccount)
  } else {
    throw new Error(httpResponse.message)
  }
}
