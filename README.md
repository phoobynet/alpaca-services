Provides simple functions to access historical and real-time data from Alpaca's [Market Data API](https://alpaca.markets/docs/api-references/market-data-api/).

[![Build and Test CI](https://github.com/phoobynet/alpaca-services/actions/workflows/actions.yml/badge.svg)](https://github.com/phoobynet/alpaca-services/actions/workflows/actions.yml)

# Requirements

An Alpaca Markets SIP market data API key/secret. You can sign up at [https://app.alpaca.markets/signup](https://app.alpaca.markets/signup).

# Documentation

Module documentation can be found [here](https://phoobynet.github.io/alpaca-services/modules.html)

# Installation

```bash
npm i @phoobynet/alpaca-services
```

# Usage

## Options

Before you can do anything, you need to configure the `options` object.

```typescript
import { options } from '@phoobynet/alpaca-services'

options.set({
  key: process.env.APCA_API_KEY_ID as string,
  secret: process.env.APCA_API_SECRET_KEY as string,
  paper: true,
})
```

## Market Data

### Historical Data

#### Trades

```typescript
// latestTradeExample.ts
import {
  cryptoMarketDataSource,
  stockMarketDataSource,
  getLatestTrade,
} from '@phoobynet/alpaca-services'

// assumes options are set

async function main() {
  const cryptoLatestTrade = getLatestTrade(cryptoMarketDataSource, 'BTCUSD')
  console.log(cryptoLatestTrade)

  const stockLatestTrade = getLatestTrade(stockMarketDataSource, 'AAPL')
  console.log(stockLatestTrade)
}

main().catch(console.error)
```
