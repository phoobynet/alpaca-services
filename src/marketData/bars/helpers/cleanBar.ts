import { Bar } from '../types'
import { parseISO } from 'date-fns'

export const cleanBar = (bar: Bar, symbol?: string): Bar => {
  return {
    ...bar,
    S: symbol || bar.S,
    t: parseISO(bar.t).toISOString(),
  }
}
