import { options } from '@/options'
import { BarAdjustment, BarsBetweenArgs, getBarsBetween } from '@/marketData'
import { subWeeks } from 'date-fns'
import { BarTimeframe, BarTimeframeUnit } from '@/marketData/bars/types'

options.set({
  key: process.env.APCA_API_KEY_ID as string,
  secret: process.env.APCA_API_SECRET_KEY as string,
  paper: true,
})

async function main() {
  const args: BarsBetweenArgs = {
    symbol: 'AAPL',
    start: subWeeks(new Date(), 1),
    end: new Date(),
    timeframe: BarTimeframe.from(1, BarTimeframeUnit.minute),
    absoluteLimit: 100,
    adjustment: BarAdjustment.split,
  }

  for await (const bar of getBarsBetween(args)) {
    console.log(bar)
  }
  process.exit(0)
}

main().catch((e) => {
  console.error(e)
})
