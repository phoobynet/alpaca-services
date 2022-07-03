import {
  Announcement,
  AnnouncementCaSubType,
  AnnouncementCaType,
  RawAnnouncement,
} from '../types'

/**
 * Clean up a raw announcement, parsing date like fields to Date objects, and numeric like fields to number's.
 * @group Trading Data
 * @category Announcements
 * @param rawAnnouncement
 */
export const cleanAnnouncement = (
  rawAnnouncement: RawAnnouncement,
): Announcement => {
  return {
    id: rawAnnouncement.id,
    corporate_action_id: rawAnnouncement.corporate_action_id,
    ca_type: rawAnnouncement.ca_type as AnnouncementCaType,
    ca_sub_type: rawAnnouncement.ca_sub_type as AnnouncementCaSubType,
    initiating_symbol: rawAnnouncement.initiating_symbol,
    initiating_original_cusip: rawAnnouncement.initiating_original_cusip,
    target_symbol: rawAnnouncement.target_symbol,
    target_original_cusip: rawAnnouncement.target_original_cusip,
    declaration_date: new Date(rawAnnouncement.declaration_date),
    ex_date: new Date(rawAnnouncement.ex_date),
    record_date: new Date(rawAnnouncement.record_date),
    payable_date: new Date(rawAnnouncement.payable_date),
    cash: Number(rawAnnouncement.cash),
    old_rate: Number(rawAnnouncement.old_rate),
    new_rate: Number(rawAnnouncement.new_rate),
  }
}
