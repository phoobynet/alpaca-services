import { Bar } from '@/marketData'
import parseDuration from 'parse-duration'
import { addMilliseconds, parseISO } from 'date-fns'
import first from 'lodash/first'
import last from 'lodash/last'

/**
 * Fills missing bars in a bar array.  However, to really convinced of the efficacy of this function.
 * @param bars
 * @param timeframe
 */
export const fillMissingBars = (bars: Bar[], timeframe: string): Bar[] => {
  const firstBar = first(bars) as Bar
  const lastBar = last(bars) as Bar

  if (firstBar.t.substring(0, 10) !== lastBar.t.substring(0, 10)) {
    throw new Error('Bars must be for the same day to make filling possible')
  }

  const duration = parseDuration(timeframe)
  const filledBars: Bar[] = []
  const barsLength = bars.length
  let isLastBar = false
  let nextExpectedTimestamp: string | undefined

  bars.forEach((current, i, arr) => {
    filledBars.push(current)
    isLastBar = i === barsLength - 1

    // TODO: if the current bar has the same date is the next bar, add the duration to the current bars time
    // and see if it matches, and if it does not, then fill with a copy of the current bar with the new time
    // keep looping until we hit a next bar
    if (!isLastBar) {
      const nextBar = arr[i + 1]

      if (nextBar) {
        nextExpectedTimestamp = addMilliseconds(
          parseISO(current.t),
          duration,
        ).toISOString()
        while (
          // cannot be equal to or greater than the next bar's timestamp
          nextExpectedTimestamp < nextBar.t &&
          // cannot be equal to or greater than the last bar's timestamp
          nextExpectedTimestamp < lastBar.t
        ) {
          filledBars.push({
            ...current,
            t: nextExpectedTimestamp,
          })
          nextExpectedTimestamp = addMilliseconds(
            parseISO(nextExpectedTimestamp),
            duration,
          ).toISOString()
        }
      }
    }
  })

  return filledBars
}
