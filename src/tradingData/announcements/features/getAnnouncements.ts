import {
  Announcement,
  AnnouncementCaType,
  AnnouncementDateType,
  RawAnnouncement,
} from '../types'
import { getTradeData } from '../../http'
import { cleanAnnouncement } from '../helpers'
import { formatISO, isAfter, isBefore, subDays } from 'date-fns'

/**
 * Corporate announcements query arguments
 */
export type AnnouncementsArgs = {
  /**
   * A list of {@link AnnouncementCaType} values.
   */
  ca_types: AnnouncementCaType[]
  /**
   * The start (inclusive) of the date range when searching corporate action announcements.
   * @remarks Limited to 90 days
   */
  since: Date
  /**
   * The end (inclusive) of the date range when searching corporate action announcements.
   * @remarks Limited to 90 days
   */
  until: Date
  /**
   * The symbol of the company initiating the announcement.
   */
  symbol?: string
  /**
   * The CUSIP (Committee on Uniform Securities Identification Procedures) of the company initiating the announcement.
   * @see https://www.investopedia.com/terms/c/cusipnumber.asp
   */
  cusip?: string
  /**
   * The {@link AnnouncementDateType} of the announcement to query.
   * @example
   * ```ts
   * const announcements = await getAnnouncements({
   *   ca_types: [AnnouncementCaType.dividend],
   *   since: new Date('2022-07-01'),
   *   until: new Date('2022-07-31'),
   *   date_type: AnnouncementDateType.declaration_date,
   * })
   * ```
   */
  date_type?: AnnouncementDateType
}

/**
 * Get corporate announcements
 * @group Trading Data
 * @category Announcements
 * @param {AnnouncementsArgs} args
 * @see https://alpaca.markets/docs/api-references/trading-api/corporate-actions-announcements/#get-announcements
 * @example
 * ```ts
 * //
 * const announcements = await getAnnouncements({
 *   ca_types: [AnnouncementCaType.dividend, AnnouncementCaType.split],
 *   since: new Date('2022-07-01'),
 *   until: new Date('2022-07-31'),
 *   symbol: 'AAPL',
 *   date_type: AnnouncementDateType.declaration_date,
 * })
 * ```
 */
export const getAnnouncements = async (
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

    queryParams.since = formatISO(since, { representation: 'date' })
  }

  if (until) {
    const now = new Date()
    const lowerBound = subDays(now, 90)

    if (isBefore(until, lowerBound)) {
      throw new Error('Until date must be no earlier than 90 days ago')
    } else if (isAfter(until, now)) {
      throw new Error('Until date must be no later than today')
    }

    queryParams.until = formatISO(since, { representation: 'date' })
  }

  if (symbol) {
    queryParams.symbol = symbol
  }

  if (cusip) {
    queryParams.cusip = cusip
  }

  if (date_type) {
    queryParams.date_type = date_type
  }

  const httpResponse = await getTradeData<RawAnnouncement[]>(
    '/corporate_actions/announcements',
    queryParams,
  )

  if (httpResponse.ok) {
    const rawAnnouncements = httpResponse.data as RawAnnouncement[]
    return rawAnnouncements.map(cleanAnnouncement)
  } else {
    throw new Error(httpResponse.message)
  }
}
