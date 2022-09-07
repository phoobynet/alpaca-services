import { Bar, RawBar } from '@/marketData/bars/types'
import { cleanMarketDataEntity } from '@/marketData/helpers'

/**
 * Ensures the resulting {@link Bar} has correct properties that are correctly formatted.
 * @internal
 * @group Market Data
 * @category Bars
 * @param {Bar|RawBar} bar - accepts {@link Bar} or {@link RawBar}
 * @param symbol
 * @returns {Bar} - a {@link Bar} with .S property populated and .t property trimmed to nearest 1,000th of a second.
 */
export const cleanBar = (
  bar: Bar | RawBar | undefined,
  symbol?: string,
): Bar => {
  if (bar === undefined) {
    throw new Error('bar is undefined')
  }

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
