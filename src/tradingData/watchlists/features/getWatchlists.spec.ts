import { getTradeData } from '../../http'
import { getWatchlists } from './getWatchlists'

jest.mock('../../http')

describe('getWatchlists', () => {
  it('check URL', async () => {
    await getWatchlists()

    expect(getTradeData).toHaveBeenCalledWith('/watchlists')
  })
})
