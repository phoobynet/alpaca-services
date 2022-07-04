Provides simple functions to access historical and real-time data from Alpaca's [Market Data API](https://alpaca.markets/docs/api-references/market-data-api/).

[![Build and Test CI](https://github.com/phoobynet/alpaca-services/actions/workflows/actions.yml/badge.svg)](https://github.com/phoobynet/alpaca-services/actions/workflows/actions.yml)

[![Publish Package to npm](https://github.com/phoobynet/alpaca-services/actions/workflows/release.yml/badge.svg)](https://github.com/phoobynet/alpaca-services/actions/workflows/release.yml)

# Market Data API

## Historical Data

### Bars

| Category | Description                | Endpoint                                                              |
| :------- | :------------------------- | :-------------------------------------------------------------------- |
| Bars     | Get bars between two dates | [getBarsBetween](/alpaca-services/docs/functions/getBarsBetween.html) |

# What does this package do?

Just a bunch of functions that give access to the various Alpaca Markets endpoints, e.g. historical data, real-time data, and more.

## It this an official Alpaca Market API package?

**NO**. This is a personal project that I've written to help me learn and use the Alpaca Market API.

## Why would I use this?

### Unified access to stock and crypto Trades, Quotes, and Bars.

Interfaces are shared between both types of market data. All implement the `MarketDataEntity` interface.

### Cleaning

Automatic cleaning of raw responses. e.g. Date strings are converted to `Date` objects, numeric strings are converted to `Number` objects, etc.

### De-nesting

Flattening of nested data structures.

#### Raw response

```json
{
  "symbol": "AAPL",
  "trade": {
    "t": "2022-04-11T17:56:08.406302477Z",
    "x": "V",
    "p": 166.81,
    "s": 300,
    "c": ["@"],
    "i": 10503,
    "z": "C"
  }
}
```

#### Cleaned Response

Note the `symbol` value has been moved into the `Trade` instance.

```json
{
  "S": "AAPL",
  "t": "2022-04-11T17:56:08.406302477Z",
  "x": "V",
  "p": 166.81,
  "s": 300,
  "c": ["@"],
  "i": 10503,
  "z": "C"
}
```

## Why wouldn't I use this?

- Currently, no support for making trades. **This is a read only API.**

## Is it "blazingly fast"?

It's just a wrapper around the Alpaca Market API, so it as fast as the API itself, your connection, and whatever cleaning up of the data occurs.

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
