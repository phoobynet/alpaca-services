import { Announcement, RawAnnouncement } from '../types'
import { getTradeData } from '../../http'
import { cleanAnnouncement } from '../helpers'
import { HttpClientError } from '../../../common'

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
  try {
    return await getTradeData<RawAnnouncement>(`/announcements/${id}`).then(
      cleanAnnouncement,
    )
  } catch (err) {
    if (err instanceof HttpClientError) {
      if (err.statusCode === 404) {
        return undefined
      }
    }

    throw err
  }
}
