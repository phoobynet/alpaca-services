import { AnnouncementCaType } from './AnnouncementCaType'
import { AnnouncementCaSubType } from './AnnouncementCaSubType'

export interface Announcement {
  id: string
  corporate_action_id: string
  ca_type: AnnouncementCaType
  ca_sub_type: AnnouncementCaSubType
  initiating_symbol: string
  initiating_original_cusip: string
  target_symbol: string
  target_original_cusip: string
  declaration_date: Date
  ex_date: Date
  record_date: Date
  payable_date: Date
  cash: number
  old_rate: number
  new_rate: number
}
