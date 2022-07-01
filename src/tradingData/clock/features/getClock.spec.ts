import { getClock } from './getClock'
import { getTradeData } from '../../http'

jest.mock('../../http')

describe('getClock', () => {
  it('should get clock using the correct URL', async () => {
    ;(getTradeData as jest.Mock).mockResolvedValueOnce({
      timestamp: '2020-01-01T00:00:00.000Z',
      is_open: true,
      next_open: '2020-01-01T01:00:00.000Z',
      next_close: '2020-01-01T02:00:00.000Z',
    })

    const clock = await getClock()

    expect(getTradeData).toHaveBeenCalledWith('/clock')

    expect(clock).toEqual({
      timestamp: new Date('2020-01-01T00:00:00.000Z'),
      is_open: true,
      next_open: new Date('2020-01-01T01:00:00.000Z'),
      next_close: new Date('2020-01-01T02:00:00.000Z'),
    })
  })
})
