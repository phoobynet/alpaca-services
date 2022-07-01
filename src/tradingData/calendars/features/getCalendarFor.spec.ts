import { getCalendarsBetween } from './getCalendarsBetween'
import { getCalendarFor } from './getCalendarFor'
import { cleanCalendar } from '../helpers'
import { CalendarRepository, RawCalendar } from '../types'

jest.mock('./getCalendarsBetween')

const rawCalendar: RawCalendar = {
  date: '2022-07-01',
  open: '09:30',
  close: '16:00',
  session_open: '0400',
  session_close: '2000',
}

describe('getCalendarFor', () => {
  describe('when no calendarRepository is supplied', () => {
    it('should return a calendar for a known trading date', async () => {
      ;(getCalendarsBetween as jest.Mock).mockReturnValueOnce(
        [
          {
            ...rawCalendar,
          },
        ].map(cleanCalendar),
      )

      const actual = await getCalendarFor(new Date('2022-07-01'))
      expect(actual).not.toBeUndefined()
    })

    it('should return undefined for an unknown trading date', async () => {
      ;(getCalendarsBetween as jest.Mock).mockReturnValueOnce(
        [].map(cleanCalendar),
      )

      const actual = await getCalendarFor(new Date('2022-07-04'))
      expect(actual).toBeUndefined()
    })

    it('should invoke getCalendarsBetween with the correct arguments', async () => {
      ;(getCalendarsBetween as jest.Mock).mockReturnValueOnce(
        [].map(cleanCalendar),
      )

      const date = new Date('2022-07-04')

      await getCalendarFor(date, undefined)
      expect(getCalendarsBetween).toHaveBeenCalledWith(date, date, undefined)
    })
  })

  describe('when a calendarRepository is supplied', () => {
    it('should invoke .find() on the calendarRepository with the date', async () => {
      const calendarRepository: CalendarRepository = {
        find: jest.fn(),
        findBetween: jest.fn(),
        findAll: jest.fn(),
      }

      const date = new Date('2022-07-04')

      await getCalendarFor(date, calendarRepository)

      expect(calendarRepository.find).toHaveBeenCalledWith(date)
    })
  })
})
