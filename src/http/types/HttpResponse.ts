export interface HttpResponse<T> {
  data?: T
  ok: boolean
  alpacaCode?: number
  statusCode: number
  statusText: string
  message?: string
}
