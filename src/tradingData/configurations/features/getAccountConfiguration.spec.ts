import { getTradeData } from '../../http'

const { getAccountConfiguration } = jest.requireActual(
  './getAccountConfiguration',
)

const getTradeDataMock = getTradeData as jest.Mock

describe('getAccountConfiguration', () => {
  it('should be called with the correct URL', async () => {
    getTradeDataMock.mockResolvedValueOnce({
      dtbp_check: 'entry',
      no_shorting: false,
      suspend_trade: false,
      trade_confirm_email: 'all',
    })

    await getAccountConfiguration()
    expect(getTradeData).toHaveBeenCalledWith('/account/configurations')
  })
})
