import { Account, RawAccount } from '../types'
import { parseISO } from 'date-fns'

export const cleanAccount = (rawAccount: RawAccount): Account => {
  return {
    id: rawAccount.id,
    account_number: rawAccount.account_number,
    status: rawAccount.status,
    crypto_status: rawAccount.crypto_status,
    currency: rawAccount.currency,
    pattern_day_trader: rawAccount.pattern_day_trader,
    trading_blocked: rawAccount.trading_blocked,
    transfers_blocked: rawAccount.transfers_blocked,
    account_blocked: rawAccount.account_blocked,
    created_at: parseISO(rawAccount.created_at).toISOString(),
    trade_suspended_by_user: rawAccount.trade_suspended_by_user,
    shorting_enabled: rawAccount.shorting_enabled,

    buying_power: parseFloat(rawAccount.buying_power),
    daytrading_buying_power: parseFloat(rawAccount.daytrading_buying_power),
    regt_buying_power: parseFloat(rawAccount.regt_buying_power),
    non_marginable_buying_power: parseFloat(
      rawAccount.non_marginable_buying_power,
    ),
    cash: parseFloat(rawAccount.cash),
    accrued_fees: parseFloat(rawAccount.accrued_fees),
    pending_transfer_in: parseFloat(rawAccount.pending_transfer_in),
    portfolio_value: parseFloat(rawAccount.portfolio_value),
    multiplier: parseFloat(rawAccount.multiplier),
    equity: parseFloat(rawAccount.equity),
    last_equity: parseFloat(rawAccount.last_equity),
    long_market_value: parseFloat(rawAccount.long_market_value),
    short_market_value: parseFloat(rawAccount.short_market_value),
    initial_margin: parseFloat(rawAccount.initial_margin),
    last_maintenance_margin: parseFloat(rawAccount.last_maintenance_margin),
    maintenance_margin: parseFloat(rawAccount.maintenance_margin),
    sma: parseFloat(rawAccount.sma),
    daytrade_count: parseInt(rawAccount.daytrade_count),
  }
}
