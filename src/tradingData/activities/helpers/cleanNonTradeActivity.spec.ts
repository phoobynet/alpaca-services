import { ActivityType, NonTradeActivity, RawNonTradeActivity } from '../types'
import { cleanNonTradeActivity } from './cleanNonTradeActivity'

describe('cleanNonTradeActivity', () => {
  it('should clean', () => {
    const rawNonTradeActivity: RawNonTradeActivity = {
      activity_type: 'DIV',
      id: '20190801011955195::5f596936-6f23-4cef-bdf1-3806aae57dbf',
      date: '2019-08-01',
      net_amount: '1.02',
      symbol: 'T',
      qty: '2',
      per_share_amount: '0.51',
    }

    const expectedNonTradeActivity: NonTradeActivity = {
      activity_type: ActivityType.DIV,
      id: '20190801011955195::5f596936-6f23-4cef-bdf1-3806aae57dbf',
      date: new Date('2019-08-01'),
      net_amount: 1.02,
      symbol: 'T',
      qty: 2,
      per_share_amount: 0.51,
    }

    const actual = cleanNonTradeActivity(rawNonTradeActivity)
    expect(actual).toEqual(expectedNonTradeActivity)
  })
})
