import { Announcement, RawAnnouncement } from '../types'
import { getTradeData } from '../../http'
import { cleanAnnouncement } from '../helpers'

/**
 * Get a corporate announcement by id
 *
 * @group Trading Data
 * @category Announcements
 * @param {string} id - with a specific announcement id
 * @returns {Promise<Announcement | undefined>} - returns the Announcement or undefined if not found
 * @see https://alpaca.markets/docs/api-references/trading-api/corporate-actions-announcements/
 * @example
 * ```ts
 * const announcement = await getAnnouncement('be3c368a-4c7c-4384-808e-f02c9f5a8afe')
 * ```
 */
export const getAnnouncement = async (
  id: string,
): Promise<Announcement | undefined> => {
  const httpResponse = await getTradeData<RawAnnouncement>(
    `/announcements/${id}`,
  )

  if (httpResponse.ok) {
    if (httpResponse.data) {
      return cleanAnnouncement(httpResponse.data)
    } else {
      return undefined
    }
  } else {
    throw new Error(httpResponse.message)
  }
}
