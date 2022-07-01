import {
  Announcement,
  AnnouncementCaType,
  AnnouncementDateType,
  RawAnnouncement,
} from '../types'
import { getTradeData } from '../../http'
import { cleanAnnouncement } from '../helpers'
import { isAfter, isBefore, subDays } from 'date-fns'
import { cleanSymbol, formatISODate } from '../../../common'

export type AnnouncementsArgs = {
  ca_types: AnnouncementCaType[]
  since: Date
  until: Date
  symbol?: string
  cusip?: string
  date_type?: AnnouncementDateType
}

export const getAnnouncements = (
  args: AnnouncementsArgs,
): Promise<Announcement[]> => {
  const { ca_types, since, until, symbol, cusip, date_type } = args

  const queryParams: Record<string, string> = {}

  if (ca_types.length === 0) {
    throw new Error('No ca_types provided')
  } else {
    queryParams.ca_types = ca_types.join(',')
  }

  if (since) {
    const now = new Date()
    const lowerBound = subDays(now, 90)
    const upperBound = subDays(now, 1)

    if (isBefore(since, lowerBound)) {
      throw new Error('Since date must be no earlier than 90 days ago')
    } else if (isAfter(since, upperBound)) {
      throw new Error('Since date must be no later than yesterday')
    } else if (isAfter(since, until)) {
      throw new Error('Since date must be no later than until date')
    }

    queryParams.since = formatISODate(since)
  }

  if (until) {
    const now = new Date()
    const lowerBound = subDays(now, 90)

    if (isBefore(until, lowerBound)) {
      throw new Error('Until date must be no earlier than 90 days ago')
    } else if (isAfter(until, now)) {
      throw new Error('Until date must be no later than today')
    }

    queryParams.until = formatISODate(since)
  }

  if (symbol) {
    queryParams.symbol = cleanSymbol(symbol)
  }

  if (cusip) {
    queryParams.cusip = cusip
  }

  if (date_type) {
    queryParams.date_type = date_type
  }

  return getTradeData<RawAnnouncement[]>(
    '/corporate_actions/announcements',
    queryParams,
  ).then((rawAnnouncements) => rawAnnouncements.map(cleanAnnouncement))
}
