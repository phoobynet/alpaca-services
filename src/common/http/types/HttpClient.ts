export interface HttpClient {
  get<T>(url: string, queryParams?: Record<string, string>): Promise<T>
}
