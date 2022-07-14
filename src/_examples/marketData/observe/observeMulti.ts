import { options } from '@/options'
import {
  MarketDataClass,
  MarketDataRealTimeSubscriptionEntityType,
  observeMulti,
  Trade,
} from '@/marketData'

options.set({
  key: process.env.APCA_API_KEY_ID as string,
  secret: process.env.APCA_API_SECRET_KEY as string,
  paper: true,
})

async function main() {
  const cancel = observeMulti<Trade>(MarketDataClass.crypto, {
    onUpdate: (update: Record<string, Trade>) => {
      console.log(update)
    },
    symbols: ['BTCUSD', 'ETHUSD'],
    throttleMs: 500,
    subscriptionEntityType: MarketDataRealTimeSubscriptionEntityType.trade,
  })

  setTimeout(() => {
    cancel()
  }, 10_000)
}

main().catch((e) => console.error(e))
