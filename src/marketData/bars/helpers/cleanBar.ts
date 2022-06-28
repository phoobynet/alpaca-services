import { Bar, RawBar } from '../types'
import { cleanMarketDataEntity } from '../../helpers'

export const cleanBar = (bar: Bar | RawBar, symbol?: string): Bar => {
  let result: Bar
  if ('bar' in bar) {
    const rawBar = bar as RawBar

    result = {
      ...rawBar.bar,
      S: rawBar.symbol || symbol,
    }
  } else {
    result = {
      ...bar,
    }
  }

  return cleanMarketDataEntity(result, symbol)
}
