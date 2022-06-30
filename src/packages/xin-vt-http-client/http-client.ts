import Axios, {AxiosInstance, AxiosRequestConfig} from 'axios';
import qs from 'qs';
import {HttpClientOptions} from './http-client-options';
import Vue from 'vue';

declare module 'vue/types/vue' {
  interface VueConstructor {
    httpClient: HttpClient;
  }
}

export class HttpClient {
  /**
   * axios 实例
   */
  private axiosInstance: AxiosInstance;

  /**
   * 构建函数
   * 支持传入自定义AxiosRequestConfig
   * @param options
   */
  constructor(options?: HttpClientOptions) {
    const axiosInstance = Axios.create(options && options.config);
    axiosInstance.interceptors.request.use(config => {
        config.headers['Accept'] = '*/*';
        const data = config.params || config.data || {};
        if (config.method === 'get') {
          config['params'] = data;
        } else {
          config['data'] = qs.stringify(data, {arrayFormat: 'brackets'});
        }
        return config;
      },
      error => {
        return Promise.reject(error);
      }
    );
    axiosInstance.interceptors.response.use(
      (res: any) => {
        if (res.data.status == false && res.data.code == 5001) {
          return Promise.resolve(res)
        }

        HttpClient.setLastAPITime();
        return Promise.resolve(res)
      },
      error => {
        // 服务器报错提示
        if(error.response && error.response.status === 500) {
          console.log(error.response)
        }
        return Promise.reject(error);
      }
    );
    this.axiosInstance = axiosInstance;
  }

  public static install(vue: typeof Vue, options?: HttpClientOptions) {
    const client = new HttpClient(options);
    // @ts-ignore
    vue.httpClient = client;
    Vue.prototype.httpClient = client;
  }

  /**
   * 设置cookie
   * @param name
   * @param value
   * @param expires
   */
  private static setCookie(name: string, value: string, expires: Date) {
    document.cookie = name + '=' + escape(value) + ';expires=' + expires.toUTCString() + ';path=/';
  }

  /**
   * 设置最后一次api请求时间
   */
  private static setLastAPITime() {
    const date: Date = new Date();
    const expireDate: Date = new Date(date.getTime() + 2 * 60 * 60 * 1000);
    HttpClient.setCookie('lastAPITime', date.getTime() + '', expireDate);
  }


  /**
   * 通用请求
   * @param config
   */
  public request(config: AxiosRequestConfig): Promise<any> {
    return this.axiosInstance.request(config);
  }

  /**
   * GET 请求
   * @param url
   * @param config
   */
  public get(url: string, config?: AxiosRequestConfig): Promise<any> {
    return this.axiosInstance.get(url, config);
  }

  /**
   * POST 请求
   * @param url
   * @param data
   * @param config
   */
  public post(url: string, data?: any, config?: AxiosRequestConfig): Promise<any> {
    return this.axiosInstance.post(url, data, config);
  }

  /**
   * PUT 请求
   * @param url
   * @param data
   * @param config
   */
  public put(url: string, data?: any, config?: AxiosRequestConfig): Promise<any> {
    return this.axiosInstance.put(url, data, config);
  }

  /**
   * DELETE 请求
   * @param url
   * @param config
   */
  public delete(url: string, config?: AxiosRequestConfig): Promise<any> {
    return this.axiosInstance.delete(url, config);
  }
}
