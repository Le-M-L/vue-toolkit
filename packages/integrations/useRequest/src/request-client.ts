import type {
  AxiosInstance,
  AxiosRequestConfig,
  CreateAxiosDefaults,
} from 'axios';

import { bindMethods, merge } from '@vue-toolskit/shared';

import axios from 'axios';

import { FileDownloader } from './modules/downloader';
import { InterceptorManager } from './modules/interceptor';
import { FileUploader } from './modules/uploader';
import { RequestOptions, type RequestClientOptions, Result } from './types';

class RequestClient {
  private readonly instance: AxiosInstance;
  private readonly requestOptions?: RequestOptions;
  public forEach: InterceptorManager['forEach']

  public addRequestInterceptor: InterceptorManager['addRequestInterceptor'];
  public addResponseInterceptor: InterceptorManager['addResponseInterceptor'];

  public download: FileDownloader['download'];
  // 是否正在刷新token
  public isRefreshing = false;
  // 刷新token队列
  public refreshTokenQueue: ((token: string) => void)[] = [];
  public upload: FileUploader['upload'];

  /**
   * 构造函数，用于创建Axios实例
   * @param options - Axios请求配置，可选
   */
  constructor(options: RequestClientOptions = {}) {
    // 合并默认配置和传入的配置
    const defaultConfig: CreateAxiosDefaults = {
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      // 默认超时时间
      timeout: 10_000,
    };
    const {requestOptions, ...axiosConfig } = options;
    this.requestOptions = requestOptions;
    const requestConfig = merge(axiosConfig, defaultConfig);
    this.instance = axios.create(requestConfig);

    bindMethods(this);

    // 实例化拦截器管理器
    const interceptorManager = new InterceptorManager(this.instance);
    this.forEach = interceptorManager.forEach.bind(interceptorManager);
    this.addRequestInterceptor =
      interceptorManager.addRequestInterceptor.bind(interceptorManager);
    this.addResponseInterceptor =
      interceptorManager.addResponseInterceptor.bind(interceptorManager);

    // 实例化文件上传器
    const fileUploader = new FileUploader(this);
    this.upload = fileUploader.upload.bind(fileUploader);
    // 实例化文件下载器
    const fileDownloader = new FileDownloader(this);
    this.download = fileDownloader.download.bind(fileDownloader);
  }

  /**
   * DELETE请求方法
   */
  public delete<T = any>(url: string, config?: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
    return this.request<T>(url, { ...config, method: 'DELETE' }, options);
  }

  /**
   * GET请求方法
   */
  public get<T = any>(url: string, config?: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
    return this.request<T>(url, { ...config, method: 'GET' }, options);
  }

  /**
   * POST请求方法
   */
  public post<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
    options?: RequestOptions): Promise<T> {
    return this.request<T>(url, { ...config, data, method: 'POST' }, options);
  }

  /**
   * PUT请求方法
   */
  public put<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
    options?: RequestOptions): Promise<T> {
    return this.request<T>(url, { ...config, data, method: 'PUT' }, options);
  }

  /**
   * 通用的请求方法
   */
  public async request<T>(url: string, config: AxiosRequestConfig, options?:RequestOptions): Promise<T> {
    try {
    const requestOptions: RequestOptions = Object.assign({}, this.requestOptions, options);
    const response: Result<T> = await this.instance({
        url,
        ...config,
      });
      return this.forEach(response, requestOptions) as T;
    } catch (error: any) {
      throw error.response ? error.response.data : error;
    }
  }
}


export { RequestClient };
