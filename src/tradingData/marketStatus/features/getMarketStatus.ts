import { format, formatInTimeZone, toDate } from 'date-fns-tz'
import {
  formatISO,
  intervalToDuration,
  isAfter,
  isBefore,
  isEqual,
} from 'date-fns'
import {
  getCalendarForToday,
  getNextCalendar,
  getPreviousCalendar,
} from '../../calendars'
import type { Calendar } from '../../calendars'
import { MarketStatus, MarketStatusDuration } from '../types'
import { AMERICA_NEW_YORK_TZ } from '../../../common'

const DATE_FORMAT = 'yyyy-MM-dd HH:mm:ss'

let date: string
let currentCalendar: Calendar | undefined
let previousCalendar: Calendar
let nextCalendar: Calendar

export const getMarketStatus = async () => {
  const localTime = new Date()
  const marketTime = toDate(localTime, {
    timeZone: AMERICA_NEW_YORK_TZ,
  })

  const localTimeIsoDate = formatISO(localTime, { representation: 'date' })

  if (date !== localTimeIsoDate) {
    currentCalendar = await getCalendarForToday()
    previousCalendar = await getPreviousCalendar(localTime)
    nextCalendar = await getNextCalendar(localTime)
    date = localTimeIsoDate
  }

  let status = MarketStatus.closedToday
  if (currentCalendar) {
    if (isBefore(marketTime, currentCalendar.session_open)) {
      status = MarketStatus.closedOpeningLater
    } else if (
      isEqual(marketTime, currentCalendar.session_open) ||
      isBefore(marketTime, currentCalendar.open)
    ) {
      status = MarketStatus.preMarket
    } else if (
      isEqual(marketTime, currentCalendar.open) ||
      isBefore(marketTime, currentCalendar.close)
    ) {
      status = MarketStatus.open
    } else if (
      isEqual(marketTime, currentCalendar.close) ||
      isBefore(marketTime, currentCalendar.session_close)
    ) {
      status = MarketStatus.postMarket
    } else if (
      isEqual(marketTime, currentCalendar.session_close) ||
      isAfter(marketTime, currentCalendar.session_close)
    ) {
      status = MarketStatus.closedForToday
    }
  }

  let nextStatus: MarketStatus

  let end: Date
  switch (status) {
    case MarketStatus.closedToday:
    case MarketStatus.closedForToday:
      nextStatus = MarketStatus.preMarket
      end = nextCalendar.session_open
      break
    case MarketStatus.closedOpeningLater:
      nextStatus = MarketStatus.preMarket
      if (!currentCalendar) {
        throw new Error('Current calendar required')
      }
      end = currentCalendar.session_open
      break
    case MarketStatus.preMarket:
      nextStatus = MarketStatus.open
      if (!currentCalendar) {
        throw new Error('Current calendar required')
      }
      end = currentCalendar.open
      break
    case MarketStatus.postMarket:
      nextStatus = MarketStatus.closedForToday
      if (!currentCalendar) {
        throw new Error('Current calendar required')
      }
      end = currentCalendar.session_close
      break
    case MarketStatus.open:
      nextStatus = MarketStatus.postMarket
      if (!currentCalendar) {
        throw new Error('Current calendar required')
      }
      end = currentCalendar.close
      break
  }

  const { days, minutes, hours, seconds } = intervalToDuration({
    start: localTime,
    end,
  })

  const timeUntilNextActiveStatus: MarketStatusDuration = {
    days,
    minutes,
    hours,
    seconds,
  }

  return {
    status,
    nextActiveStatus: nextStatus,
    timeUntilNextActiveStatus,
    localTime: format(localTime, DATE_FORMAT),
    marketTime: formatInTimeZone(localTime, AMERICA_NEW_YORK_TZ, DATE_FORMAT),
    currentCalendar,
    previousCalendar,
    nextCalendar,
  }
}
