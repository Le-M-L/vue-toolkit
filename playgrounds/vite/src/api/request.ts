import { useRequest } from "@vue-toolskit/integrations/useRequest";

const { authenticateResponseInterceptor, errorMessageResponseInterceptor, RequestClient } = useRequest();

interface HttpResponse<T = any> {
    /**
     * 0 表示成功 其他表示失败
     * 0 means success, others means fail
     */
    code: number;
    data: T;
    message: string;
}

function createRequestClient(baseURL: string) {
    const client = new RequestClient({
        baseURL,
        requestOptions:{
            isTransformResponse: true
        }
    });

    /**
     * 重新认证逻辑
     */
    async function doReAuthenticate() {

    }

    /**
     * 刷新token逻辑
     */
    async function doRefreshToken() {
        
    }

    function formatToken(token: null | string) {
        return token ? `Bearer ${token}` : null;
    }
    // 请求头处理
    client.addRequestInterceptor({
        fulfilled: async (config) => {
            return config;
        },
    });

    // response数据解构
    client.addResponseInterceptor<HttpResponse>({
        fulfilled: (response, options) => {
            console.log(response, options)
            const { data: responseData, status } = response;
            const { code, data, message: msg } = responseData;
            if (status >= 200 && status < 400 && code === 200) {
                if(!options.isTransformResponse) {
                    return responseData;
                }
                return data;
            }
            throw new Error(`Error ${status}: ${msg}`);
        },
    });

    // token过期的处理
    client.addResponseInterceptor(
        authenticateResponseInterceptor({
            client,
            doReAuthenticate,
            doRefreshToken,
            enableRefreshToken: false,
            formatToken,
        })
    );

    // 通用的错误处理,如果没有进入上面的错误处理逻辑，就会进入这里
    client.addResponseInterceptor(
        errorMessageResponseInterceptor((msg: string, error) => {
        // 这里可以根据业务进行定制,你可以拿到 error 内的信息进行定制化处理，根据不同的 code 做不同的提示，而不是直接使用 message.error 提示 msg
            // 当前mock接口返回的错误字段是 error 或者 message
            const responseData = error?.response?.data ?? {};
            const errorMessage = responseData?.error ?? responseData?.message ?? "";
            // 如果没有错误信息，则会根据状态码进行提示
        })
    );
    return client;
}
export const requestClient = createRequestClient("https://taiyangapp.com/sun/business");

export const baseRequestClient = new RequestClient({ baseURL: "https://taiyangapp.com/sun/business" });
