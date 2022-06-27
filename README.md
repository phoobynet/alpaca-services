Provides simple functions to access historical and real-time data from Alpaca's [Market Data API](https://alpaca.markets/docs/api-references/market-data-api/).

# Installation

```bash
npm i @phoobynet/alpaca-services
```

# Usage

## Options

```typescript
import {
  options,
  stockDataSource,
  getLatestTrade,
} from '@phoobynet/alpaca-services'

// options only need to be set once
options.set({
  key: process.env.APCA_API_KEY_ID as string,
  secret: process.env.APCA_API_SECRET_KEY as string,
})

async function main() {
  const latestTrade = await getLatestTrade(stockDataSource, 'AAPL')
  console.log(latestTrade)
}

main().catch(console.error)
```
