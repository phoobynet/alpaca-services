import { options } from '@/options'
import { getDailyBarFor } from '@/marketData/bars/features/getDailyBarFor'

options.set({
  key: process.env.APCA_API_KEY_ID as string,
  secret: process.env.APCA_API_SECRET_KEY as string,
  paper: true,
})

async function main() {
  const dailyBar = await getDailyBarFor({
    symbol: 'AAPL',
    date: new Date('2022-08-29'),
  })

  console.log(dailyBar)
}

main().catch(console.error)
