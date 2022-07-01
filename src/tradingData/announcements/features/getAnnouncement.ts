import { Announcement, RawAnnouncement } from '../types'
import { getTradeData } from '../../http'
import { cleanAnnouncement } from '../helpers'
import { HttpClientError } from '../../../common'

export const getAnnouncement = async (id: string): Promise<Announcement> => {
  try {
    return await getTradeData<RawAnnouncement>(`/announcements/${id}`).then(
      cleanAnnouncement,
    )
  } catch (err) {
    if (err instanceof HttpClientError) {
      if (err.statusCode === 404) {
        throw new Error(`Announcement with id ${id} not found`)
      }
    }

    throw err
  }
}
