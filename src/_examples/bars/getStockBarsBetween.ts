import { options } from '../../options'
import { BarsBetweenArgs, getBarsBetween } from '../../marketData/bars'
import { subWeeks } from 'date-fns'
import { stockMarketDataSource } from '../../marketData/http'

options.set({
  key: process.env.APCA_API_KEY_ID as string,
  secret: process.env.APCA_API_SECRET_KEY as string,
})

async function main() {
  const args: BarsBetweenArgs = {
    symbol: 'AAPL',
    start: subWeeks(new Date(), 1),
    end: new Date(),
    timeframe: '1Day',
  }

  for await (const bar of getBarsBetween(stockMarketDataSource, args)) {
    console.log(bar)
  }
  process.exit(0)
}

main().catch((e) => {
  console.error(e)
})
