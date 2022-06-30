import { Order, RawOrder } from '../types'

const toNumber = (value?: string): number | undefined => {
  if (value) {
    return Number(value)
  }

  return undefined
}

export const cleanOrder = (rawOrder: RawOrder): Order => {
  return {
    id: rawOrder.id,
    type: rawOrder.type,
    side: rawOrder.side,
    status: rawOrder.status,
    asset_id: rawOrder.asset_id,
    symbol: rawOrder.symbol,
    asset_class: rawOrder.asset_class,
    qty: toNumber(rawOrder.qty),
    filled_qty: toNumber(rawOrder.filled_qty) as number,
    filled_avg_price: toNumber(rawOrder.filled_avg_price),
    order_class: rawOrder.order_class,
    order_type: rawOrder.order_type,
    time_in_force: rawOrder.time_in_force,
    limit_price: toNumber(rawOrder.limit_price),
    stop_price: toNumber(rawOrder.stop_price),
    extended_hours: rawOrder.extended_hours,
    legs: rawOrder.legs?.map(cleanOrder),
    trail_percent: toNumber(rawOrder.trail_percent),
    trail_price: toNumber(rawOrder.trail_price),
    hwm: toNumber(rawOrder.hwm),
    created_at: new Date(rawOrder.created_at),
    updated_at: new Date(rawOrder.updated_at),
    submitted_at: new Date(rawOrder.submitted_at),
    filled_at: rawOrder.filled_at ? new Date(rawOrder.filled_at) : undefined,
    expired_at: rawOrder.expired_at ? new Date(rawOrder.expired_at) : undefined,
    canceled_at: rawOrder.canceled_at
      ? new Date(rawOrder.canceled_at)
      : undefined,
    failed_at: rawOrder.failed_at ? new Date(rawOrder.failed_at) : undefined,
    replaced_at: rawOrder.replaced_at
      ? new Date(rawOrder.replaced_at)
      : undefined,
    replaced_by: rawOrder.replaced_by,
    replaces: rawOrder.replaces,
    client_order_id: rawOrder.client_order_id,
  }
}
