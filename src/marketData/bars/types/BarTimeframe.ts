import { BarTimeframeUnit } from '@/marketData/bars/types/BarTimeframeUnit'

const TimeFrameUnitMap = new Map<string, BarTimeframeUnit>([
  ['Min', BarTimeframeUnit.minute],
  ['T', BarTimeframeUnit.minute],
  ['Hour', BarTimeframeUnit.hour],
  ['T', BarTimeframeUnit.hour],
  ['Day', BarTimeframeUnit.day],
  ['D', BarTimeframeUnit.day],
  ['Week', BarTimeframeUnit.week],
  ['W', BarTimeframeUnit.week],
  ['Month', BarTimeframeUnit.month],
  ['M', BarTimeframeUnit.month],
])

/**
 * Creates a bar timeframe from a number of units and a unit.
 * Some common examples are included.
 * @group Market Data
 * @category Bars
 */
export class BarTimeframe {
  public static readonly ONE_MINUTE = new BarTimeframe(
    1,
    BarTimeframeUnit.minute,
  )
  public static readonly FIVE_MINUTES = new BarTimeframe(
    5,
    BarTimeframeUnit.minute,
  )
  public static readonly FIFTEEN_MINUTES = new BarTimeframe(
    15,
    BarTimeframeUnit.minute,
  )
  public static readonly THIRTY_MINUTES = new BarTimeframe(
    15,
    BarTimeframeUnit.minute,
  )
  public static readonly ONE_HOUR = new BarTimeframe(1, BarTimeframeUnit.hour)
  public static readonly ONE_DAY = new BarTimeframe(1, BarTimeframeUnit.day)
  public static readonly ONE_WEEK = new BarTimeframe(1, BarTimeframeUnit.week)
  public static readonly ONE_MONTH = new BarTimeframe(1, BarTimeframeUnit.month)
  public static readonly ONE_YEAR = new BarTimeframe(12, BarTimeframeUnit.month)

  constructor(public amount: number, public unit: BarTimeframeUnit) {
    if (amount < 1) {
      throw new Error('Timeframe amount must be greater than 0')
    }
  }

  toString() {
    return `${this.amount}${this.unit}`
  }

  /**
   * Quickly create a bar timeframe from a number of units and a unit.
   * @param amount
   * @param unit
   */
  static from(amount: number, unit: BarTimeframeUnit): BarTimeframe {
    return new BarTimeframe(amount, unit)
  }

  static parse(amount: string): BarTimeframe {
    const match = amount.match(/(\d+)(\w+)/)
    if (!match) {
      throw new Error('Invalid timeframe')
    }
    const [, number, unit] = match

    if (!unit || !number) {
      throw new Error('Invalid timeframe')
    }
    const timeframeUnit = TimeFrameUnitMap.get(unit)

    if (!timeframeUnit) {
      throw new Error('Invalid timeframe')
    }

    return new BarTimeframe(parseInt(number, 10), timeframeUnit)
  }
}
