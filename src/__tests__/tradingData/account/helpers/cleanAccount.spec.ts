import { Account, AccountStatus, RawAccount } from '@/tradingData'

const { cleanAccount } = jest.requireActual(
  '@/tradingData/account/helpers/cleanAccount',
)

describe('cleanAccount', () => {
  test('should return a cleaned account', () => {
    const rawAccount: RawAccount = {
      account_blocked: false,
      account_number: 'AAAAAAAA',
      buying_power: '262113.632',
      cash: '-23140.2',
      created_at: '2019-06-12T22:47:07.99658Z',
      currency: 'USD',
      daytrade_count: 0,
      daytrading_buying_power: '262113.632',
      equity: '103820.56',
      id: 'e6fe16f3-64a4-4921-8928-zzzzzzzzzzzz',
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

    const expected: Account = {
      account_blocked: false,
      account_number: 'AAAAAAAA',
      buying_power: 262113.632,
      cash: -23140.2,
      created_at: new Date('2019-06-12T22:47:07.996Z'),
      currency: 'USD',
      daytrade_count: 0,
      daytrading_buying_power: 262113.632,
      equity: 103820.56,
      id: 'e6fe16f3-64a4-4921-8928-zzzzzzzzzzzz',
      initial_margin: 63480.38,
      last_equity: 103529.24,
      last_maintenance_margin: 38000.832,
      long_market_value: 126960.76,
      maintenance_margin: 38088.228,
      multiplier: 4,
      pattern_day_trader: false,
      portfolio_value: 103820.56,
      regt_buying_power: 80680.36,
      short_market_value: 0,
      shorting_enabled: true,
      sma: 0,
      status: AccountStatus.ACTIVE,
      trade_suspended_by_user: false,
      trading_blocked: false,
      transfers_blocked: false,
      crypto_status: AccountStatus.ACTIVE,
      non_marginable_buying_power: 80680.36,
      accrued_fees: 0,
      pending_transfer_in: 0,
    }

    const actual = cleanAccount(rawAccount)

    expect(actual).toStrictEqual(expected)
  })
})
