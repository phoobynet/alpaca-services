import { Account, AccountStatus, RawAccount } from '../types'
import { parseISO } from 'date-fns'

/**
 * Clean up a raw account, parsing date like fields to Date objects, and numeric like fields to number's.
 * @internal
 * @group Trading Data
 * @category Account
 * @param {RawAccount} rawAccount - raw http response from Alpaca
 */
export const cleanAccount = (rawAccount: RawAccount): Account => {
  return {
    id: rawAccount.id,
    account_number: rawAccount.account_number,
    status: rawAccount.status as AccountStatus,
    crypto_status: rawAccount.crypto_status as AccountStatus,
    currency: rawAccount.currency,
    pattern_day_trader: rawAccount.pattern_day_trader,
    trading_blocked: rawAccount.trading_blocked,
    transfers_blocked: rawAccount.transfers_blocked,
    account_blocked: rawAccount.account_blocked,
    created_at: parseISO(rawAccount.created_at),
    trade_suspended_by_user: rawAccount.trade_suspended_by_user,
    shorting_enabled: rawAccount.shorting_enabled,

    buying_power: Number(rawAccount.buying_power),
    daytrading_buying_power: Number(rawAccount.daytrading_buying_power),
    regt_buying_power: Number(rawAccount.regt_buying_power),
    non_marginable_buying_power: Number(rawAccount.non_marginable_buying_power),
    cash: Number(rawAccount.cash),
    accrued_fees: Number(rawAccount.accrued_fees),
    pending_transfer_in: Number(rawAccount.pending_transfer_in),
    portfolio_value: Number(rawAccount.portfolio_value),
    multiplier: Number(rawAccount.multiplier),
    equity: Number(rawAccount.equity),
    last_equity: Number(rawAccount.last_equity),
    long_market_value: Number(rawAccount.long_market_value),
    short_market_value: Number(rawAccount.short_market_value),
    initial_margin: Number(rawAccount.initial_margin),
    last_maintenance_margin: Number(rawAccount.last_maintenance_margin),
    maintenance_margin: Number(rawAccount.maintenance_margin),
    sma: Number(rawAccount.sma),
    daytrade_count: Number(rawAccount.daytrade_count),
  }
}
