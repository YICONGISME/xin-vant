import Vue from 'vue';
import {HttpClientOptions} from "../../src/packages/http-client/http-client-options"
import {AxiosRequestConfig} from 'axios';

declare module 'vue/types/vue' {
  interface VueConstructor {
    httpClient: HttpClient;
  }
}

export class HttpClient {
  static install(vue: typeof Vue, options?: HttpClientOptions): void;

  /**
   * 通用请求
   * @param config
   */
  request(config: AxiosRequestConfig): Promise<any>;

  /**
   * GET 请求
   * @param url
   * @param config
   */
  get(url: string, config?: AxiosRequestConfig): Promise<any>;

  /**
   * POST 请求
   * @param url
   * @param data
   * @param config
   */
  post(url: string, data?: any, config?: AxiosRequestConfig): Promise<any>

  /**
   * PUT 请求
   * @param url
   * @param data
   * @param config
   */
  put(url: string, data?: any, config?: AxiosRequestConfig): Promise<any>

  /**
   * DELETE 请求
   * @param url
   * @param config
   */
  delete(url: string, config?: AxiosRequestConfig): Promise<any>
}
