import { getTradeData } from '../../http'
import { ActivitiesArgs, getActivities } from './getActivities'
import { subDays } from 'date-fns'
import { ActivityType } from '../types'

jest.mock('../../http')

describe('getActivities', () => {
  describe('validation', () => {
    it('should throw if both date and until are specified', () => {
      const args: ActivitiesArgs = {
        date: new Date(),
        until: new Date(),
      }

      expect(() => getActivities(args)).toThrowError(
        'Cannot specify both date and until',
      )
    })

    it('should throw if both date and after are specified', () => {
      const args: ActivitiesArgs = {
        date: new Date(),
        after: new Date(),
      }

      expect(() => getActivities(args)).toThrowError(
        'Cannot specify both date and after',
      )
    })

    it('should throw if until is before after', () => {
      const args: ActivitiesArgs = {
        after: new Date(),
        until: subDays(new Date(), 1),
      }

      expect(() => getActivities(args)).toThrowError(
        'until cannot be before after',
      )
    })
  })

  describe('query params', () => {
    it('should assign date', async () => {
      ;(getTradeData as jest.Mock).mockResolvedValueOnce([])

      const args: ActivitiesArgs = {
        date: new Date('2022-07-01'),
      }

      await getActivities(args)

      expect(getTradeData).toHaveBeenCalledWith(expect.any(String), {
        date: '2022-07-01T00:00:00.000Z',
      })
    })

    it('should assign until', async () => {
      ;(getTradeData as jest.Mock).mockResolvedValueOnce([])

      const args: ActivitiesArgs = {
        until: new Date('2022-07-01'),
      }

      await getActivities(args)

      expect(getTradeData).toHaveBeenCalledWith(expect.any(String), {
        until: '2022-07-01T00:00:00.000Z',
      })
    })

    it('should assign until and after', async () => {
      ;(getTradeData as jest.Mock).mockResolvedValueOnce([])

      const args: ActivitiesArgs = {
        until: new Date('2022-07-01'),
        after: new Date('2022-06-01'),
      }

      await getActivities(args)

      expect(getTradeData).toHaveBeenCalledWith(expect.any(String), {
        until: '2022-07-01T00:00:00.000Z',
        after: '2022-06-01T00:00:00.000Z',
      })
    })

    it('should assign direction', async () => {
      ;(getTradeData as jest.Mock).mockResolvedValueOnce([])

      const args: ActivitiesArgs = {
        direction: 'asc',
      }

      await getActivities(args)

      expect(getTradeData).toHaveBeenCalledWith(expect.any(String), {
        direction: 'asc',
      })
    })

    it('should assign page_size', async () => {
      ;(getTradeData as jest.Mock).mockResolvedValueOnce([])

      const args: ActivitiesArgs = {
        page_size: 10,
      }

      await getActivities(args)

      expect(getTradeData).toHaveBeenCalledWith(expect.any(String), {
        page_size: '10',
      })
    })

    it('should assign page_token', async () => {
      ;(getTradeData as jest.Mock).mockResolvedValueOnce([])

      const args: ActivitiesArgs = {
        page_token: 'blah',
      }

      await getActivities(args)

      expect(getTradeData).toHaveBeenCalledWith(expect.any(String), {
        page_token: 'blah',
      })
    })
  })

  it('should clean results', async () => {
    ;(getTradeData as jest.Mock).mockResolvedValueOnce([
      {
        activity_type: 'FILL',
        cum_qty: '1',
        id: '20190524113406977::8efc7b9a-8b2b-4000-9955-d36e7db0df74',
        leaves_qty: '0',
        price: '1.63',
        qty: '1',
        side: 'buy',
        symbol: 'LPCN',
        transaction_time: '2019-05-24T15:34:06.977Z',
        order_id: '904837e3-3b76-47ec-b432-046db621571b',
        type: 'fill',
      },
      {
        activity_type: 'DIV',
        id: '20190801011955195::5f596936-6f23-4cef-bdf1-3806aae57dbf',
        date: '2019-08-01',
        net_amount: '1.02',
        symbol: 'T',
        qty: '2',
        per_share_amount: '0.51',
      },
    ])

    const actual = await getActivities({})
    expect(actual).toEqual([
      {
        activity_type: 'FILL' as ActivityType,
        cum_qty: 1,
        id: '20190524113406977::8efc7b9a-8b2b-4000-9955-d36e7db0df74',
        leaves_qty: 0,
        price: 1.63,
        qty: 1,
        side: 'buy',
        symbol: 'LPCN',
        transaction_time: new Date('2019-05-24T15:34:06.977Z'),
        order_id: '904837e3-3b76-47ec-b432-046db621571b',
        type: 'fill',
      },
      {
        activity_type: 'DIV' as ActivityType,
        id: '20190801011955195::5f596936-6f23-4cef-bdf1-3806aae57dbf',
        date: new Date('2019-08-01'),
        net_amount: 1.02,
        symbol: 'T',
        qty: 2,
        per_share_amount: 0.51,
      },
    ])
  })
})
