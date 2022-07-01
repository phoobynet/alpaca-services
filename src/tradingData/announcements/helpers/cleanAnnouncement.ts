import { Announcement, RawAnnouncement } from '../types'

export const cleanAnnouncement = (
  rawAnnouncement: RawAnnouncement,
): Announcement => {
  return {
    id: rawAnnouncement.id,
    corporate_actions_id: rawAnnouncement.corporate_actions_id,
    ca_type: rawAnnouncement.ca_type,
    ca_sub_type: rawAnnouncement.ca_sub_type,
    initiating_symbol: rawAnnouncement.initiating_symbol,
    initiating_original_cusip: rawAnnouncement.initiating_original_cusip,
    target_symbol: rawAnnouncement.target_symbol,
    target_original_cusip: rawAnnouncement.target_original_cusip,
    declaration_date: new Date(rawAnnouncement.declaration_date),
    expiration_date: new Date(rawAnnouncement.expiration_date),
    record_date: new Date(rawAnnouncement.record_date),
    payable_date: new Date(rawAnnouncement.payable_date),
    cash: Number(rawAnnouncement.cash),
    old_rate: Number(rawAnnouncement.old_rate),
    new_rate: Number(rawAnnouncement.new_rate),
  }
}
