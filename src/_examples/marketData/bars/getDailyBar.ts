import { options } from '@/options'
import {
  Bar,
  BarsBetweenArgs,
  getBarsBetween,
  mergeBars,
  usEquitySource,
} from '@/marketData'
import { getCalendarForToday } from '@/tradingData'
import first from 'lodash/first'
import last from 'lodash/last'

options.set({
  key: process.env.APCA_API_KEY_ID as string,
  secret: process.env.APCA_API_SECRET_KEY as string,
  paper: true,
})

async function main() {
  const calendar = await getCalendarForToday(true)

  if (!calendar) {
    console.warn('No calendar found for today')
    process.exit(1)
  }

  const args: BarsBetweenArgs = {
    symbol: 'AAPL',
    start: calendar.session_open,
    end: calendar.session_close,
    timeframe: '1Minute',
  }

  const bars: Bar[] = []

  for await (const bar of getBarsBetween(usEquitySource, args)) {
    bars.push(bar)
  }

  console.log('Count: ', bars.length)

  console.log(first(bars))
  console.log(last(bars))

  const singleBar = mergeBars(bars)
  console.log(JSON.stringify(singleBar, null, 2))
}

main().catch((e) => {
  console.error(e)
})
