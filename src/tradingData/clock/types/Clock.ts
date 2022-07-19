/**
 * @group Trading Data
 * @category Clock
 */
export interface Clock {
  timestamp: Date
  is_open: boolean
  next_open: Date
  next_close: Date
}
