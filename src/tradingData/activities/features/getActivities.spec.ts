import { getTradeData } from '../../http'
import { subDays } from 'date-fns'
import { ActivitiesArgs } from '../types'
// import { cleanTradeActivity, cleanNonTradeActivity } from '../helpers'

const { getActivities } = jest.requireActual('./getActivities')

const getTradeDataMock = getTradeData as jest.Mock
// const cleanTradeActivityMock = cleanTradeActivity as jest.Mock
// const cleanNonTradeActivityMock = cleanNonTradeActivity as jest.Mock

describe('getActivities', () => {
  test('check URL', async () => {
    getTradeDataMock.mockResolvedValueOnce({
      ok: true,
      data: [],
    })

    await getActivities({})

    expect(getTradeDataMock).toHaveBeenCalledWith(
      '/account/activities',
      expect.anything(),
    )
  })

  describe('when date is specified', () => {
    test('and until is specified, throw', async () => {
      const args: ActivitiesArgs = {
        date: new Date('2022-07-01'),
        until: subDays(new Date('2022-07-01'), 1),
      }

      await expect(getActivities(args)).rejects.toThrow(
        'Cannot specify both date and until',
      )
    })

    test('and after is specified, throw', async () => {
      const args: ActivitiesArgs = {
        date: new Date('2022-07-01'),
        after: subDays(new Date('2022-07-01'), 1),
      }

      await expect(getActivities(args)).rejects.toThrow(
        'Cannot specify both date and after',
      )
    })

    test('queryParams.date should be set', async () => {
      getTradeDataMock.mockResolvedValueOnce({
        ok: true,
        data: [],
      })

      const args: ActivitiesArgs = {
        date: new Date('2022-07-01'),
      }

      await getActivities(args)

      expect(getTradeDataMock).toHaveBeenCalledWith(expect.any(String), {
        date: new Date('2022-07-01').toISOString(),
      })
    })
  })

  describe('when until is specified', () => {
    test('queryParams.until should be set', async () => {
      getTradeDataMock.mockResolvedValueOnce({
        ok: true,
        data: [],
      })

      const args: ActivitiesArgs = {
        until: subDays(new Date('2022-07-01'), 1),
      }

      await getActivities(args)

      expect(getTradeDataMock).toHaveBeenCalledWith(expect.any(String), {
        until: subDays(new Date('2022-07-01'), 1).toISOString(),
      })
    })
  })
  describe('when after is specified', () => {
    test('queryParams.after should be set', async () => {
      getTradeDataMock.mockResolvedValueOnce({
        ok: true,
        data: [],
      })

      const args: ActivitiesArgs = {
        after: subDays(new Date('2022-07-01'), 1),
      }

      await getActivities(args)

      expect(getTradeDataMock).toHaveBeenCalledWith(expect.any(String), {
        after: subDays(new Date('2022-07-01'), 1).toISOString(),
      })
    })
  })

  describe('when after and until are specified', () => {
    test('but after is after until, throw', async () => {
      const args: ActivitiesArgs = {
        after: subDays(new Date('2022-07-01'), 1),
        until: subDays(new Date('2022-07-01'), 2),
      }

      await expect(getActivities(args)).rejects.toThrow(
        'until cannot be before after',
      )
    })

    test('queryParams.after and queryParams.until should be set', async () => {
      getTradeDataMock.mockResolvedValueOnce({
        ok: true,
        data: [],
      })

      const args: ActivitiesArgs = {
        after: subDays(new Date('2022-07-01'), 1),
        until: new Date('2022-07-01'),
      }

      await getActivities(args)

      expect(getTradeDataMock).toHaveBeenCalledWith(expect.any(String), {
        after: subDays(new Date('2022-07-01'), 1).toISOString(),
        until: new Date('2022-07-01').toISOString(),
      })
    })
  })
})
