import { getTradeHttpClient } from '../../http'
import { getWatchlists } from './getWatchlists'

jest.mock('../../http')

const getTradeHttpClientMock = getTradeHttpClient as jest.Mock
const getFn = jest.fn()
getTradeHttpClientMock.mockImplementation(() => ({ get: getFn }))

describe('getWatchlists', () => {
  beforeEach(() => {
    getTradeHttpClientMock.mockClear()
  })

  it('check URL', async () => {
    await getWatchlists()

    expect(getFn).toHaveBeenCalledWith('/watchlists')
  })
})
