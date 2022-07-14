import { getTradeData } from '../../http'
import { cleanClock } from '../helpers'

const { getClock } = jest.requireActual('./getClock')

const resolvedValue = {
  timestamp: '2020-01-01T00:00:00.000Z',
  is_open: true,
  next_open: '2020-01-01T01:00:00.000Z',
  next_close: '2020-01-01T02:00:00.000Z',
}

describe('getClock', () => {
  ;(getTradeData as jest.Mock).mockResolvedValue(resolvedValue)
  test('should get clock using the correct URL', async () => {
    await getClock()

    expect(getTradeData).toHaveBeenCalledWith('/clock')
  })

  test('should clean the clock', async () => {
    await getClock()

    expect(cleanClock).toHaveBeenCalledWith(resolvedValue)
  })
})
