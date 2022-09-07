import { options } from '@/options'
import { Bar, getIntradayBars } from '@/marketData'

options.set({
  key: process.env.APCA_API_KEY_ID as string,
  secret: process.env.APCA_API_SECRET_KEY as string,
  paper: true,
})

async function main() {
  const bars: Bar[] = []

  for await (const bar of getIntradayBars({
    symbol: 'BTC/USD',
    date: new Date('2022-07-18'),
  })) {
    bars.push(bar)
  }
  console.table(bars)

  for await (const bar of getIntradayBars({
    symbol: 'AAPL',
    date: new Date('2022-09-06'),
  })) {
    bars.push(bar)
  }
  console.table(bars)
}

main().catch((e) => {
  console.error(e)
})
