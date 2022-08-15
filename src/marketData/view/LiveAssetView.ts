import EventEmitter from 'eventemitter3'
import {
  startOfDay,
  subDays,
  subHours,
  subMonths,
  subWeeks,
  subYears,
} from 'date-fns'
import { maxBy, minBy, takeRight } from 'lodash'
import { arrayFromAsyncIterable, numberDiff, NumberDiffResult } from '@/helpers'
import {
  Bar,
  getBarsSince,
  getSnapshot,
  MarketDataSource,
  observeBars,
  observeQuotes,
  observeTrades,
  Quote,
  Trade,
} from '@/marketData'
import { CancelFn } from '@/types'
import { Asset, getAsset } from '@/tradingData'

export interface LiveAssetViewChange {
  period: string
  change: NumberDiffResult
}

export interface LiveAssetViewRange {
  low: number
  high: number
  range: number
  pctOfCurrentPrice: number
}

export interface LiveAssetViewUpdate {
  symbol: string
  asset: Asset
  latestTrade: Trade
  latestQuote: Quote
  prevDailyBar: Bar
  dailyBar: Bar
  ytdBars: Bar[]
  changeMetrics: LiveAssetViewChange[]
  dailyBars: Bar[]
  dailyRange: LiveAssetViewRange
}

interface LiveAssetViewChangePeriodSpec {
  period: string
  since: Date
}

/**
 * Create an instance, and subscribe to updates.
 * @example
 * const view = new LiveAssetView(cryptoSource, 'BTCUSD')
 * view.on('update', (update) => {
 *   console.log(update)
 * })
 * await view.start()
 *
 * // remember to stop
 * view.stop()
 */
export class LiveAssetView extends EventEmitter {
  private cancelTradeObserver!: CancelFn
  private cancelQuoteObserver!: CancelFn
  private cancelBarObserver!: CancelFn
  private changeMetricsDates: LiveAssetViewChangePeriodSpec[] = []
  private today: Date = startOfDay(new Date())

  private assetMetricsUpdate!: LiveAssetViewUpdate

  constructor(private source: MarketDataSource, public symbol: string) {
    super()

    this.changeMetricsDates = [
      {
        period: '1 Day',
        since: subDays(this.today, 1),
      },
      {
        period: '1 Week',
        since: subWeeks(this.today, 1),
      },
      {
        period: '2 Weeks',
        since: subWeeks(this.today, 2),
      },
      {
        period: '1 Month',
        since: subMonths(this.today, 1),
      },
      {
        period: '3 Months',
        since: subMonths(this.today, 3),
      },
      {
        period: '6 Months',
        since: subMonths(this.today, 6),
      },
      {
        period: '1 Year',
        since: subMonths(this.today, 12),
      },
    ]
  }

  async start() {
    this.stop()

    const asset = await getAsset(this.symbol)

    if (!asset) {
      throw new Error(
        `Unable to locate asset information for the provided symbol: ${this.symbol}`,
      )
    }

    const snapshot = await getSnapshot(this.source, {
      symbol: this.symbol,
      exchange: asset.class === 'crypto' ? asset.exchange : '',
    })

    const { latestQuote, latestTrade, prevDailyBar, dailyBar } = snapshot

    const assetMetricsUpdate: Partial<LiveAssetViewUpdate> = {
      symbol: this.symbol,
      asset,
      latestTrade,
      latestQuote,
      prevDailyBar,
      dailyBar,
      changeMetrics: [],
    }

    assetMetricsUpdate.dailyBars = await arrayFromAsyncIterable(
      getBarsSince(this.source, {
        symbol: this.symbol,
        timeframe: '1Min',
        since: subHours(new Date(), 24),
        exchanges: ['CBSE'],
      }),
    )

    assetMetricsUpdate.ytdBars = await arrayFromAsyncIterable(
      getBarsSince(this.source, {
        symbol: this.symbol,
        timeframe: '1Day',
        since: subWeeks(subYears(new Date(), 1), 1),
        exchanges: ['CBSE'],
      }),
    )

    const high = maxBy(assetMetricsUpdate.dailyBars, 'h')?.h as number
    const low = minBy(assetMetricsUpdate.dailyBars, 'l')?.l as number
    const range = high - low

    assetMetricsUpdate.dailyRange = {
      low,
      high,
      range,
      pctOfCurrentPrice: range / latestTrade.p,
    }

    this.assetMetricsUpdate = assetMetricsUpdate as LiveAssetViewUpdate

    this.cancelTradeObserver = observeTrades(
      this.source,
      this.symbol,
      (trade) => {
        const changeMetrics = this.changeMetricsDates.map(
          ({ period, since }) => {
            const change = numberDiff(this.findYtdBar(since).c, trade.p)

            return {
              period,
              change,
            }
          },
        )

        const dailyRangeLow = Math.min(
          this.assetMetricsUpdate.dailyRange.low as number,
          trade.p,
        )
        const dailyRangeHigh = Math.max(
          this.assetMetricsUpdate.dailyRange?.high as number,
          trade.p,
        )
        const dailyRangeRange = dailyRangeHigh - dailyRangeLow
        const dailyRangePctOfCurrentPrice = dailyRangeRange / trade.p

        const dailyRange: LiveAssetViewRange = {
          low: dailyRangeLow,
          high: dailyRangeHigh,
          range: dailyRangeRange,
          pctOfCurrentPrice: dailyRangePctOfCurrentPrice,
        }

        this.patch({
          latestTrade: trade,
          changeMetrics,
          dailyRange,
        })
      },
      500,
    )

    this.cancelQuoteObserver = observeQuotes(
      this.source,
      this.symbol,
      (quote) => {
        this.patch({ latestQuote: quote })
      },
      500,
    )

    this.cancelBarObserver = observeBars(this.source, this.symbol, (bar) => {
      this.patch({
        dailyBars: takeRight(
          [...(this.assetMetricsUpdate.dailyBars ?? []), bar],
          60 * 24,
        ),
      })
    })
  }

  stop() {
    this.cancelTradeObserver && this.cancelTradeObserver()
    this.cancelQuoteObserver && this.cancelQuoteObserver()
    this.cancelBarObserver && this.cancelBarObserver()
  }

  private findYtdBar(onOrAfter: Date): Bar {
    const queryDate = onOrAfter.toISOString()
    const bar = this.assetMetricsUpdate.ytdBars.find(
      (bar) => bar.t >= queryDate,
    )

    if (!bar) {
      throw new Error('Expected to find a bar')
    }

    return bar
  }

  private patch(update: Partial<LiveAssetViewUpdate>) {
    this.assetMetricsUpdate = {
      ...this.assetMetricsUpdate,
      ...update,
    }

    // TODO: May make a deep copy?
    this.emit('update', this.assetMetricsUpdate)
  }
}
