/**
 * @internal
 * @group Trading Data
 * @category Clock
 */
export interface RawClock {
  timestamp: string
  is_open: boolean
  next_open: string
  next_close: string
}
