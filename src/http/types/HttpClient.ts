/**
 * @internal
 * @group Common
 * @category HTTP
 */
import { HttpResponse } from './HttpResponse'

export interface HttpClient {
  get<T>(
    url: string,
    queryParams?: Record<string, string>,
  ): Promise<HttpResponse<T>>

  post<T>(
    url: string,
    queryParams?: Record<string, string>,
    data?: unknown,
  ): Promise<HttpResponse<T>>

  put<T>(
    url: string,
    queryParams?: Record<string, string>,
    data?: unknown,
  ): Promise<HttpResponse<T>>

  delete(
    url: string,
    queryParams?: Record<string, string>,
  ): Promise<HttpResponse<void>>
}
