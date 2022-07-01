import { getCalendarFor } from './getCalendarFor'
import { Calendar, CalendarRepository } from '../types'
import { getCalendarForToday } from './getCalendarForToday'

jest.mock('./getCalendarFor')

const calendar: Calendar = {
  date: new Date('2022-07-01T04:00:00.000Z'),
  open: new Date('2022-07-01T13:30:00.000Z'),
  close: new Date('2022-07-01T20:00:00.000Z'),
  session_open: new Date('2022-07-01T08:00:00.000Z'),
  session_close: new Date('2022-07-02T00:00:00.000Z'),
}

describe('getCalendarForToday', () => {
  describe('when no calendarRepository is supplied', () => {
    it('should return a calendar for a known trading date', async () => {
      ;(getCalendarFor as jest.Mock).mockReturnValueOnce(calendar)

      const actual = await getCalendarForToday()
      expect(actual).not.toBeUndefined()
    })

    it('should return undefined for an unknown trading date', async () => {
      ;(getCalendarFor as jest.Mock).mockReturnValueOnce(undefined)

      const actual = await getCalendarForToday()
      expect(actual).toBeUndefined()
    })

    it('should invoke getCalendarFor with the correct arguments', async () => {
      const date = new Date('2022-07-04')

      await getCalendarFor(date, undefined)
      expect(getCalendarFor).toHaveBeenCalledWith(date, undefined)
    })
  })

  describe('when a calendarRepository is supplied', () => {
    it('should pass correct arguments to getCalendarFor', async () => {
      const calendarRepository: CalendarRepository = {
        find: jest.fn(),
        findBetween: jest.fn(),
        findAll: jest.fn(),
      }

      await getCalendarForToday(calendarRepository)

      expect(getCalendarFor).toHaveBeenCalledWith(
        expect.any(Date),
        calendarRepository,
      )
    })
  })
})
