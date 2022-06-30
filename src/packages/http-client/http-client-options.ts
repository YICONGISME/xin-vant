import {AxiosRequestConfig} from 'axios';

export interface HttpClientOptions {
    config?: AxiosRequestConfig;
    store?: any;
}
