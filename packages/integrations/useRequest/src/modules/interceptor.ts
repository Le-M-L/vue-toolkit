import type { AxiosInstance } from 'axios';

import type {
  RequestInterceptorConfig,
  RequestOptions,
  ResponseInterceptorConfig,
  Result,
} from '../types';

const defaultRequestInterceptorConfig: RequestInterceptorConfig = {
  fulfilled: (response) => response,
  rejected: (error) => Promise.reject(error),
};

const defaultResponseInterceptorConfig: ResponseInterceptorConfig = {
  fulfilled: (response: Result) => response,
  rejected: (error) => Promise.reject(error),
};
interface Fulfilleds<T = any> {
  fulfilled?: (
    response: Result<T>,
    options: RequestOptions,
  ) => Result | Promise<Result>;
  rejected?: (error: any, options: RequestOptions) => any;
}


class InterceptorManager {
  private axiosInstance: AxiosInstance;
  private fulfilleds: Array<Fulfilleds> = []
  constructor(instance: AxiosInstance) {
    this.axiosInstance = instance;
  }

  addRequestInterceptor({
    fulfilled,
    rejected,
  }: RequestInterceptorConfig = defaultRequestInterceptorConfig) {
    this.axiosInstance.interceptors.request.use(fulfilled, rejected);
  }

  addResponseInterceptor<T = any>(responseInterceptor: Fulfilleds<T> = defaultResponseInterceptorConfig) {
    responseInterceptor && this.fulfilleds.push(responseInterceptor)
    // this.axiosInstance.interceptors.response.use(fulfilled, rejected);
  }

  forEach(response:Result, options: RequestOptions) {
    let promise = Promise.resolve(response);
    this.fulfilleds.forEach(handler => {
      promise = promise.then(async res => {
        try {
          // 检查 fulfilled 是否存在
          if (handler.fulfilled) {
            return await handler.fulfilled(res, options);
          }
          return res; // 如果不存在，直接返回结果
        } catch (err) {
          // 检查 rejected 是否存在
          if (handler.rejected) {
            return handler.rejected(err, options);
          }
          throw err; // 如果不存在，抛出错误
        }
      })
      .catch((err) => {
        // 检查 rejected 是否存在
        if (handler.rejected) {
          return handler.rejected(err, options);
        }
        throw err; // 如果不存在，抛出错误
      });
    })
    return promise;
  }
}

export { InterceptorManager };
