import { BarTimeframeUnit } from '@/marketData/bars/types/BarTimeframeUnit'

/**
 * Creates a bar timeframe from a number of units and a unit.
 * Some common examples are included.
 * @group Market Data
 * @category Bars
 */
export class BarTimeframe {
  public static readonly OneMinute = new BarTimeframe(
    1,
    BarTimeframeUnit.minute,
  )
  public static readonly FiveMinutes = new BarTimeframe(
    5,
    BarTimeframeUnit.minute,
  )
  public static readonly FifteenMinutes = new BarTimeframe(
    15,
    BarTimeframeUnit.minute,
  )
  public static readonly ThirtyMinutes = new BarTimeframe(
    15,
    BarTimeframeUnit.minute,
  )
  public static readonly OneHour = new BarTimeframe(1, BarTimeframeUnit.hour)
  public static readonly OneDay = new BarTimeframe(1, BarTimeframeUnit.day)
  public static readonly OneWeek = new BarTimeframe(1, BarTimeframeUnit.week)
  public static readonly OneMonth = new BarTimeframe(1, BarTimeframeUnit.month)
  public static readonly OneYear = new BarTimeframe(12, BarTimeframeUnit.month)

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
}
