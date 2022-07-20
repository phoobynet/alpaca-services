import { getTradeData } from '@/tradingData/http'
import { RawAccount } from '@/tradingData'
import { cleanAccount } from '@/tradingData/account/helpers'

const { getAccount } = jest.requireActual(
  '@/tradingData/account/features/getAccount',
)

const getTradeDataMock = getTradeData as jest.Mock
const cleanAccountMock = cleanAccount as jest.Mock

const rawAccount: RawAccount = {
  account_blocked: false,
  account_number: 'AAAAAAAAA',
  buying_power: '262113.632',
  cash: '-23140.2',
  created_at: '2019-06-12T22:47:07.99658Z',
  currency: 'USD',
  daytrade_count: 0,
  daytrading_buying_power: '262113.632',
  equity: '103820.56',
  id: 'e6fe16f3-64a4-4921-8928-xxxxxxxxxxx',
  initial_margin: '63480.38',
  last_equity: '103529.24',
  last_maintenance_margin: '38000.832',
  long_market_value: '126960.76',
  maintenance_margin: '38088.228',
  multiplier: '4',
  pattern_day_trader: false,
  portfolio_value: '103820.56',
  regt_buying_power: '80680.36',
  short_market_value: '0',
  shorting_enabled: true,
  sma: '0',
  status: 'ACTIVE',
  trade_suspended_by_user: false,
  trading_blocked: false,
  transfers_blocked: false,
  crypto_status: 'ACTIVE',
  non_marginable_buying_power: '80680.36',
  accrued_fees: '0',
  pending_transfer_in: '0',
}

describe('getAccount', () => {
  test('should send the correct URL', async () => {
    getTradeDataMock.mockResolvedValueOnce({
      ok: true,
    })

    await getAccount()

    expect(getTradeData).toHaveBeenCalledWith('/account')
  })

  test('should clean the account response', async () => {
    getTradeDataMock.mockReturnValueOnce({
      ok: true,
      data: rawAccount,
    })

    await getAccount()

    expect(cleanAccountMock).toHaveBeenCalledWith(rawAccount)
  })

  test('throws the correct error message when something goes wrong', async () => {
    getTradeDataMock.mockReturnValueOnce({
      ok: false,
      message: 'Some error',
    })

    await expect(async () => await getAccount()).rejects.toThrowError(
      'Some error',
    )
  })
})
