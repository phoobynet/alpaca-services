import { Bar, DailyBarArgs } from '@/marketData/bars/types'
import { cleanSymbol, getSource, isCryptoSource } from '@/marketData/helpers'
import { formatISO, subDays } from 'date-fns'
import first from 'lodash/first'

/**
 * Returns a single bar for the given day or the previous day if the market is closed or not open yet
 * @group Market Data
 * @category Bars
 * @param args
 */
export const getDailyBar = async (
  args: DailyBarArgs,
): Promise<Bar | undefined> => {
  const cleanedSymbol = cleanSymbol(args.symbol)
  const source = await getSource(cleanedSymbol)

  if (isCryptoSource(source)) {
    return await source
      .get<{ bars: Record<string, Bar[]> }>('/bars', {
        symbols: cleanedSymbol,
        start: formatISO(new Date(), { representation: 'date' }),
        end: formatISO(new Date(), { representation: 'date' }),
        timeframe: '1Day',
      })
      .then((result) => first(result.bars[cleanedSymbol]))
  } else {
    let bar: Bar | undefined
    let date = new Date()
    let attempts = 0

    while (!bar && attempts < 5) {
      bar = await source
        .get<{ bars?: Bar[] }>(`${cleanedSymbol}/bars`, {
          start: formatISO(date, { representation: 'date' }),
          end: formatISO(date, { representation: 'date' }),
          timeframe: '1Day',
        })
        .then((result) => (result.bars?.length ? result.bars[0] : undefined))
      date = subDays(date, 1)
      attempts++
    }

    return bar
  }
}
