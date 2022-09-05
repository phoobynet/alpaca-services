import type { AssetRepository, CalendarRepository } from '@/tradingData'

/**
 * Global options for the application.
 * @group Options
 * @remarks accessToken is used for OAuth type access, and is not required for non-OAuth type access.
 */
export interface Options {
  key?: string
  secret?: string
  accessToken?: string
  paper: boolean
  calendarRepository?: CalendarRepository
  assetRepository?: AssetRepository
  debugStreams?: boolean
  disableRestMutex?: boolean
}
