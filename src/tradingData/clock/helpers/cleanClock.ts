import { Clock, RawClock } from '../types'

export const cleanClock = (rawClock: RawClock): Clock => {
  return {
    timestamp: new Date(rawClock.timestamp),
    is_open: rawClock.is_open,
    next_open: new Date(rawClock.next_open),
    next_close: new Date(rawClock.next_close),
  }
}
