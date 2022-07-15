import { options } from '@/options'
import {
  BarAdjustment,
  getMultiBars,
  MultiBarsArgs,
  usEquitySource,
} from '@/marketData'
import { subWeeks } from 'date-fns'

options.set({
  key: process.env.APCA_API_KEY_ID as string,
  secret: process.env.APCA_API_SECRET_KEY as string,
  paper: true,
})

async function main() {
  const args: MultiBarsArgs = {
    symbols: ['AAPL', 'AMZN'],
    start: subWeeks(new Date(), 1),
    end: new Date(),
    timeframe: '1Day',
    absoluteLimit: 1,
    adjustment: BarAdjustment.split,
  }

  const result = await getMultiBars(usEquitySource, args)
  console.log(result)
  process.exit(0)
}

main().catch((e) => {
  console.error(e)
})
