/**
 * @group Trading Data
 * @category Streaming
 */
export enum TradeEventType {
  new = 'new',
  fill = 'fill',
  partial_fill = 'partial_fill',
  canceled = 'canceled',
  expired = 'expired',
  done_for_day = 'done_for_day',
  replaced = 'replaced',
  rejected = 'rejected',
  pending_new = 'pending_new',
  stopped = 'stopped',
  pending_cancel = 'pending_cancel',
  pending_replace = 'pending_replace',
  calculated = 'calculated',
  suspended = 'suspended',
  order_replace_rejected = 'order_replace_rejected',
  order_cancel_rejected = 'order_cancel_rejected',
}
