import { ActivityType, RawTradeActivity, TradeActivity } from '../types'
import { cleanTradeActivity } from './cleanTradeActivity'

describe('cleanActivity', () => {
  it('should clean the raw activity', () => {
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

    const expectedTradeActivity: TradeActivity = {
      activity_type: ActivityType.FILL,
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
    }

    const actual = cleanTradeActivity(rawTradeActivity)

    expect(actual).toEqual(expectedTradeActivity)
  })
})
