import { options } from '@/options'
import {
  getIntradayBars,
  stockMarketDataSource,
  getPreviousDailyBar,
} from '@/marketData'
import { arrayFromAsyncIterable } from '@/helpers'

options.set({
  key: process.env.APCA_API_KEY_ID as string,
  secret: process.env.APCA_API_SECRET_KEY as string,
  paper: true,
})

async function main() {
  const bars = await arrayFromAsyncIterable(
    await getIntradayBars(stockMarketDataSource, {
      symbol: 'AAPL',
      date: new Date('2022-07-13'),
    }),
  )

  const previousDailyBar = await getPreviousDailyBar(stockMarketDataSource, {
    symbol: 'AAPL',
  })

  console.log(JSON.stringify(previousDailyBar, null, 2))

  console.log('count: ' + bars.length)
  console.log('first bar: ' + JSON.stringify(bars[0], null, 2))
  console.log('last bar: ' + JSON.stringify(bars[bars.length - 1], null, 2))
}

main().catch((e) => {
  console.error(e)
})
