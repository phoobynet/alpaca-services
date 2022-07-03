/**
 * @internal
 * @group Common
 * @category HTTP
 */
export interface HttpClient {
  get<T>(url: string, queryParams?: Record<string, string>): Promise<T>

  post<T>(
    url: string,
    queryParams?: Record<string, string>,
    data?: unknown,
  ): Promise<T>

  put<T>(
    url: string,
    queryParams?: Record<string, string>,
    data?: unknown,
  ): Promise<T>

  delete(url: string, queryParams?: Record<string, string>): Promise<void>
}
