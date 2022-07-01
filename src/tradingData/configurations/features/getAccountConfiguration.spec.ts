import { getTradeData } from '../../http'
import { getAccountConfiguration } from './getAccountConfiguration'

jest.mock('../../http')

describe('getAccountConfiguration', () => {
  it('should be called with the correct URL', async () => {
    ;(getTradeData as jest.Mock).mockResolvedValueOnce({
      dtbp_check: 'entry',
      no_shorting: false,
      suspend_trade: false,
      trade_confirm_email: 'all',
    })

    await getAccountConfiguration()
    expect(getTradeData).toHaveBeenCalledWith('/account/configurations')
  })
})
