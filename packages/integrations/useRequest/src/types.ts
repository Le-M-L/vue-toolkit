import type {
  AxiosResponse,
  CreateAxiosDefaults,
  InternalAxiosRequestConfig,
} from 'axios';
 type ErrorMessageMode = 'none' | 'modal' | 'message' | undefined;

type RequestContentType =
  | 'application/json;charset=utf-8'
  | 'application/octet-stream;charset=utf-8'
  | 'application/x-www-form-urlencoded;charset=utf-8'
  | 'multipart/form-data;charset=utf-8';


  interface RequestOptions {
    // 将请求参数拼接到url
    joinParamsToUrl?: boolean;
    // 格式化请求参数时间
    formatDate?: boolean;
    // 是否处理请求结果
    isTransformResponse?: boolean;
    // 是否返回本机响应标头
    // 例如：需要获取响应标头时使用此属性
    isReturnNativeResponse?: boolean;
    // 是否加入url
    joinPrefix?: boolean;
    // 接口地址，如果留空，请使用默认的apiUrl
    apiUrl?: string;
    // 请求拼接路径
    urlPrefix?: string;
    // 错误消息提示类型
    errorMessageMode?: ErrorMessageMode;
    // 成功消息提示类型
    successMessageMode?: ErrorMessageMode;
    // 是否添加时间戳
    joinTime?: boolean;
    ignoreCancelToken?: boolean;
    // 是否在标头中发送令牌
    withToken?: boolean;
    custom?:string;
    isReturnTotal?: boolean
  }
  

type RequestClientOptions = CreateAxiosDefaults & {
  requestOptions?: RequestOptions;
};

interface RequestInterceptorConfig {
  fulfilled?: (
    config: InternalAxiosRequestConfig,
  ) =>
    | InternalAxiosRequestConfig<any>
    | Promise<InternalAxiosRequestConfig<any>>;
  rejected?: (error: any) => any;
}



interface Result<T = any, D = any> extends AxiosResponse<T, D> {
  requestOptions?: RequestOptions
}
interface ResponseInterceptorConfig<T = any> {
  fulfilled?: (
    response: Result<T>,
    options: RequestOptions
  ) => Result | Promise<Result>;
  rejected?: (error: any, options: RequestOptions) => any;
}


type MakeErrorMessageFn = (message: string, error: any, options: RequestOptions) => void;

interface HttpResponse<T = any> {
  /**
   * 0 表示成功 其他表示失败
   * 0 means success, others means fail
   */
  code: number;
  data: T;
  message: string;
}

export type {
  HttpResponse,
  MakeErrorMessageFn,
  RequestClientOptions,
  RequestContentType,
  RequestInterceptorConfig,
  ResponseInterceptorConfig,
  ErrorMessageMode,
  RequestOptions,
  Result
};
