import { NewsArticleImage } from '@/marketData/news/types/NewsArticleImage'

/**
 * @group Market Data
 * @category News
 */
export interface NewsArticle {
  id: number
  headline: string
  author: string
  created_at: string
  updated_at: string
  summary: string
  content: string
  images: NewsArticleImage[]
  symbols: string[]
  source: string
}
