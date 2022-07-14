import { MarketStatusUpdate } from './marketStatusUpdate'

export interface MarketStatusHandler {
  (marketStatus: MarketStatusUpdate): void
}
