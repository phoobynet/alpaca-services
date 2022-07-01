import { RawNonTradeActivity, RawTradeActivity } from '../types'
import { isNonTradeActivity } from './isNonTradeActivity'

describe('isNonTradeActivity', () => {
  it('should return true for non-trade activity', () => {
    const rawNonTradeActivity: RawNonTradeActivity = {
      activity_type: 'DIV',
      id: '20190801011955195::5f596936-6f23-4cef-bdf1-3806aae57dbf',
      date: '2019-08-01',
      net_amount: '1.02',
      symbol: 'T',
      qty: '2',
      per_share_amount: '0.51',
    }

    const actual = isNonTradeActivity(rawNonTradeActivity)
    expect(actual).toBe(true)
  })

  it('should return false for trade activity', () => {
    const rawTradeActivity: RawTradeActivity = {
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
    }

    const actual = isNonTradeActivity(rawTradeActivity)
    expect(actual).toBe(false)
  })
})
