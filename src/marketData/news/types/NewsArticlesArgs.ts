/**
 * Args for {@link getNewsArticles}
 * @group Market Data
 * @category News
 */
export type NewsArticlesArgs = {
  symbols?: string[]
  start?: Date
  end?: Date
  limit?: number
  sort?: 'DESC' | 'ASC'
  include_content?: boolean
  exclude_contentless?: boolean
}
