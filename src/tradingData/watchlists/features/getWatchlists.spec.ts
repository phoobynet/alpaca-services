import { getTradeData } from '../../http'

const { getWatchlists } = jest.requireActual('./getWatchlists')

describe('getWatchlists', () => {
  it('check URL', async () => {
    await getWatchlists()

    expect(getTradeData).toHaveBeenCalledWith('/watchlists')
  })
})
