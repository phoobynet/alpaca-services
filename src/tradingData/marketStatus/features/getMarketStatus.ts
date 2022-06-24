import { toDate } from 'date-fns-tz'
import { formatISO } from 'date-fns'

const AMERICA_NEW_YORK_TZ = 'America/New_York'

export const getMarketStatus = () => {
  const localTime = new Date()
  const marketTime = toDate(localTime, {
    timeZone: AMERICA_NEW_YORK_TZ,
  })

  const localTimeIsoDate = formatISO(localTime, { representation: 'date' })
}
