export interface Announcement {
  id: string
  corporate_actions_id: string
  ca_type: string
  ca_sub_type: string
  initiating_symbol: string
  initiating_original_cusip: string
  target_symbol: string
  target_original_cusip: string
  declaration_date: Date
  expiration_date: Date
  record_date: Date
  payable_date: Date
  cash: number
  old_rate: number
  new_rate: number
}
