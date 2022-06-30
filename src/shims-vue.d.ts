import Vue from 'vue';
import {Route, VueRouter} from 'vue-router/types/router';
import {AxiosInstance} from 'axios';

declare module 'vue/types/vue' {

  interface Vue {
    $router: VueRouter; // 这表示this下有这个东西
    $route: Route;
    $track: any;
    $track2: any;
    http: AxiosInstance;
    $http: AxiosInstance;
  }

  interface VueConstructor {
    $router: VueRouter; // 这表示this下有这个东西
    $route: Route;
    $track: any;
    $track2: any;
    http: AxiosInstance;
    $http: AxiosInstance;
  }
}
