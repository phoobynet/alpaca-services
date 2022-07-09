import type { AssetRepository, CalendarRepository } from '@/tradingData'

export interface Options {
  key: string
  secret: string
  paper: boolean
  calendarRepository?: CalendarRepository
  assetRepository?: AssetRepository
}
