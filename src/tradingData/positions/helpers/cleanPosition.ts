import { Position, RawPosition } from '@/tradingData/positions/types'

/**
 * @internal
 * @param rawPosition
 */
export const cleanPosition = (rawPosition: RawPosition): Position => {
  return {
    asset_id: rawPosition.asset_id,
    symbol: rawPosition.symbol,
    exchange: rawPosition.exchange,
    asset_class: rawPosition.asset_class,
    avg_entry_price: Number(rawPosition.avg_entry_price),
    qty: Number(rawPosition.qty),
    side: rawPosition.side,
    market_value: Number(rawPosition.market_value),
    cost_basis: Number(rawPosition.cost_basis),
    unrealized_pl: Number(rawPosition.unrealized_pl),
    unrealized_plpc: Number(rawPosition.unrealized_plpc),
    unrealized_intraday_pl: Number(rawPosition.unrealized_intraday_pl),
    unrealized_intraday_plpc: Number(rawPosition.unrealized_intraday_plpc),
    current_price: Number(rawPosition.current_price),
    lastday_price: Number(rawPosition.lastday_price),
    change_today: Number(rawPosition.change_today),
  }
}
