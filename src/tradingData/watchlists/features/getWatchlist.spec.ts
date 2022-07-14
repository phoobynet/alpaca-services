import { getTradeData } from '../../http'
import { getWatchlist } from './getWatchlist'

jest.mock('../../http')

describe('getWatchlist', () => {
  describe('check URL parameters', () => {
    it('should send the correct URLs and query parameters', async () => {
      await getWatchlist('foo')
      expect(getTradeData).toHaveBeenCalledWith('/watchlists/foo')
    })
  })
})
