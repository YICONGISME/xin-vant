import Vue from "vue";
import { AxiosResponse } from "axios";

export class XinVantService {
  // 普通请求
  static http(data: any) {
    return Vue.httpClient.request(data).then((response: AxiosResponse) => {
      const res: any = response.data;
      return res;
    });
  }
  static post(url: string, data?: object, showErrorMessage = true) {
    return this.http({ method: 'post', url, data })
  }
  static get(url: string, data?: object, showErrorMessage = true) {
    return this.http({ method: 'get', url, data })
  }
}
