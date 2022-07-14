import {
  Announcement,
  AnnouncementCaSubType,
  AnnouncementCaType,
  RawAnnouncement,
} from '../types'

const { cleanAnnouncement } = jest.requireActual('./cleanAnnouncement')

const rawAnnouncement: RawAnnouncement = {
  id: '1cb2ed66-a58d-454c-8a6e-5a0c6665d9c9',
  corporate_action_id: '001055102_AB22',
  ca_type: 'dividend',
  ca_sub_type: 'cash',
  initiating_symbol: 'AFL',
  initiating_original_cusip: '025870106',
  target_symbol: 'AFL',
  target_original_cusip: '025870106',
  declaration_date: '2022-05-17',
  ex_date: '2022-05-17',
  record_date: '2022-05-18',
  payable_date: '2022-06-01',
  cash: '0.4',
  old_rate: '1',
  new_rate: '1',
}

describe('cleanAnnouncement', () => {
  it('should return a cleaned announcement', () => {
    const expected: Announcement = {
      id: '1cb2ed66-a58d-454c-8a6e-5a0c6665d9c9',
      corporate_action_id: '001055102_AB22',
      ca_type: AnnouncementCaType.dividend,
      ca_sub_type: AnnouncementCaSubType.cash,
      initiating_symbol: 'AFL',
      initiating_original_cusip: '025870106',
      target_symbol: 'AFL',
      target_original_cusip: '025870106',
      declaration_date: new Date('2022-05-17'),
      ex_date: new Date('2022-05-17'),
      record_date: new Date('2022-05-18'),
      payable_date: new Date('2022-06-01'),
      cash: 0.4,
      old_rate: 1,
      new_rate: 1,
    }

    const actual = cleanAnnouncement(rawAnnouncement)
    expect(actual).toEqual(expected)
  })
})
