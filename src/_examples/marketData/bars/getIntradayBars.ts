import { options } from '@/options'
import {
  Bar,
  BarAdjustment,
  getIntradayBars,
  MarketDataFeed,
  usEquitySource,
} from '@/marketData'
// import { take, takeRight } from 'lodash'
// import { takeRight } from 'lodash'

options.set({
  key: process.env.APCA_API_KEY_ID as string,
  secret: process.env.APCA_API_SECRET_KEY as string,
  paper: true,
})

async function main() {
  const bars: Bar[] = []

  for await (const bar of getIntradayBars(usEquitySource, {
    symbol: 'AAPL',
    date: new Date('2022-07-18'),
    adjustment: BarAdjustment.all,
    feed: MarketDataFeed.iex,
  })) {
    bars.push(bar)
  }

  // console.log(bars.length)

  console.table(bars)
  // console.log(JSON.stringify(take(bars, 2), null, 2))
  // console.log(JSON.stringify(takeRight(bars, 2), null, 2))
}

main().catch((e) => {
  console.error(e)
})
