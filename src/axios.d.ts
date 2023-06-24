// import type { AxiosRequestConfig } from 'axios'
// declare module 'axios' {
//   interface AxiosResponse {
//     (config: AxiosRequestConfig): Promise<any>
//   }
//   export function create(config?: AxiosRequestConfig): AxiosInstance
// }
import type { AxiosRequestConfig } from 'axios'

declare module 'axios' {

  export interface AxiosInstance {
    request<T = any, R = ReqRes.ResponseResult<T>>(
      config: AxiosRequestConfig
    ): Promise<R>
    get<T = any, R = ReqRes.ResponseResult<T>>(
      url: string,
      config?: AxiosRequestConfig
    ): Promise<R>
    delete<T = any, R = ReqRes.ResponseResult<T>>(
      url: string,
      config?: AxiosRequestConfig
    ): Promise<R>
    head<T = any, R = ReqRes.ResponseResult<T>>(
      url: string,
      config?: AxiosRequestConfig
    ): Promise<R>
    options<T = any, R = ReqRes.ResponseResult<T>>(
      url: string,
      config?: AxiosRequestConfig
    ): Promise<R>
    post<T = any, R = ReqRes.ResponseResult<T>>(
      url: string,
      data?: any,
      config?: AxiosRequestConfig
    ): Promise<R>
    put<T = any, R = ReqRes.ResponseResult<T>>(
      url: string,
      data?: any,
      config?: AxiosRequestConfig
    ): Promise<R>
    patch<T = any, R = ReqRes.ResponseResult<T>>(
      url: string,
      data?: any,
      config?: AxiosRequestConfig
    ): Promise<R>
  }

}
// import axios, { Axios, AxiosResponse, AxiosRequestConfig } from 'axios'

// declare module 'axios' {
//   interface AxiosResponse<T = any> {
//      // 这个地方放属性
//      csr: any
//   }
//   export function create(config?: AxiosRequestConfig): AxiosInstance
// }
