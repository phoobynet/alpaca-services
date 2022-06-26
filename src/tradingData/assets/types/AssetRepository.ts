import { Asset } from './Asset'

export interface AssetRepository {
  find(symbol: string): Promise<Asset | undefined>

  findAll(): Promise<Asset[]>
}
