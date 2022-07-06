import { getCalendarsBetween } from './getCalendarsBetween'
import { isDateEqual } from '../../../helpers'
import { Calendar, CalendarRepository } from '../types'

const { getCalendarFor } = jest.requireActual('./getCalendarFor')

const getCalendarsBetweenMock = getCalendarsBetween as jest.Mock
const isDateEqualMock = isDateEqual as jest.Mock

describe('getCalendarFor', () => {
  describe('with calendarRepository', () => {
    let calendarRepository: CalendarRepository
    beforeAll(() => {
      calendarRepository = {
        find: jest.fn(),
        findAll: jest.fn(),
        findBetween: jest.fn(),
      }
    })

    test('no http request is made', async () => {
      getCalendarFor(new Date('2022-07-01'), calendarRepository)
      expect(getCalendarsBetweenMock).not.toHaveBeenCalled()
    })

    test('should invoke calendarRepository.find', async () => {
      getCalendarFor(new Date('2022-07-01'), calendarRepository)
      expect(calendarRepository.find).toHaveBeenCalledWith(
        new Date('2022-07-01'),
      )
    })
  })

  describe('without calendarRepository', () => {
    test('should invoke getCalendarsBetween', async () => {
      getCalendarsBetweenMock.mockResolvedValueOnce([])

      await getCalendarFor(new Date('2022-07-01'))

      expect(getCalendarsBetweenMock).toHaveBeenCalledWith(
        new Date('2022-07-01'),
        new Date('2022-07-01'),
        undefined,
      )
    })

    test('should find the calendar', async () => {
      const calendar: Calendar = {
        date: new Date('2022-07-01'),
        open: new Date('2022-07-01 13:30'),
        close: new Date('2022-07-01 19:00'),
        session_open: new Date('2022-07-01 08:00'),
        session_close: new Date('2022-07-02 00:00'),
      }

      getCalendarsBetweenMock.mockReturnValueOnce([calendar])

      await getCalendarFor(new Date('2022-07-01'))

      expect(isDateEqualMock).toHaveBeenCalledWith(
        calendar.date,
        new Date('2022-07-01'),
      )
    })
  })
})
