import { Asset } from './Asset'

/**
 * An interface for a repository of {@link Asset}s.
 *
 * Provide your own cache implementation to avoid HTTP requests.
 * @group Trading Data
 * @category Assets
 * @example
 * The following example shows how to use a custom cache implementation to avoid HTTP requests using the <a href="http://dexie.org" target="_blank">Dexie</a> indexeddb wrapper.
 *
 * ### Dependencies
 *
 * ```bash
 * npm i dexie @phoobynet/alpaca-services
 * ```
 *
 * ### assetRepository.ts
 *
 *  ```ts
 * // assetRepository.ts
 * import type { Asset, AssetRepository } from '@phoobynet/alpaca-services'
 * import { getAssets, cleanSymbol } from '@phoobynet/alpaca-services'
 * import Dexie from 'dexie'
 *
 * class AlpacaServicesAssetsDatabase extends Dexie {
 *   public assets!: Dexie.Table<Asset>
 *
 *   constructor() {
 *     super('AlpacaServicesAssetsDatabase')
 *
 *     this.version(1).stores({
 *       assets: 'id,class,status,symbol,exchange,name,tradable,shortable,marginable,easy_to_borrow',
 *     })
 *   }
 * }
 *
 * const database = new AlpacaServicesAssetsDatabase()
 *
 * let assetsReady = false
 *
 * const isEmpty = async (): Promise<void> => {
 *   if (!assetsReady) {
 *     const c = await database.assets.count()
 *     if (c === 0) {
 *       const assets = await getAssets()
 *       await database.assets.bulkPut(assets)
 *     }
 *     assetsReady = true
 *   }
 * }
 *
 * export const assetRepository: AssetRepository = {
 *   async find(symbol: string): Promise<Asset | undefined> {
 *     symbol = cleanSymbol(symbol)
 *     await isEmpty()
 *     return database.assets.where('symbol').equalsIgnoreCase(symbol).first()
 *   },
 *   async findAll(): Promise<Asset[]> {
 *     await isEmpty()
 *     return database.assets.toArray()
 *   },
 * }
 * ```
 */
export interface AssetRepository {
  find(symbol: string): Promise<Asset | undefined>

  findAll(): Promise<Asset[]>
}
