import { Bar, RawBar } from '@/marketData/bars/types'
import { cleanMarketDataEntity } from '@/marketData/helpers'

/**
 * @internal
 * @group Market Data
 * @category Bars
 * @param bar
 * @param symbol
 */
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
