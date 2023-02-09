import { getTradeData } from '../../http'

const { getWatchlists } = jest.requireActual('./getWatchlists')

const getTradeDataMock = getTradeData as jest.Mock

describe('getWatchlists', () => {
  test('check URL', async () => {
    getTradeDataMock.mockResolvedValueOnce({
      ok: true,
    })

    await getWatchlists()

    expect(getTradeData).toHaveBeenCalledWith('/watchlists')
  })

  test('throw when request failed', async () => {
    getTradeDataMock.mockResolvedValueOnce({
      ok: false,
      message: 'some error',
    })

    await expect(async () => await getWatchlists()).rejects.toThrow(
      'some error',
    )
  })
})
