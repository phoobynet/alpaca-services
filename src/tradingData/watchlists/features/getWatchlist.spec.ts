import { getTradeHttpClient } from '../../http'
import { getWatchlist } from './getWatchlist'

jest.mock('../../http')

const getTradeHttpClientMock = getTradeHttpClient as jest.Mock
const getFn = jest.fn()
getTradeHttpClientMock.mockImplementation(() => ({ get: getFn }))

describe('getWatchlist', () => {
  beforeEach(() => {
    getTradeHttpClientMock.mockClear()
  })
  it('check URL', async () => {
    await getWatchlist('foo')
    expect(getFn).toHaveBeenCalledWith('/watchlists/foo')
  })
})
