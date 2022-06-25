import { Bar, RawBar } from '../types'
import { parseISO } from 'date-fns'

export const cleanBar = (bar: Bar | RawBar, symbol?: string): Bar => {
  const isRawBar = 'bar' in bar

  if (isRawBar) {
    return {
      ...bar.bar,
      S: symbol || bar.symbol,
      t: parseISO(bar.bar.t).toISOString(),
    }
  }

  return {
    ...bar,
    S: symbol || bar.S,
    t: parseISO(bar.t).toISOString(),
  }
}
