/**
 * 网络请求工具函数
 */

/**
 * @description 请求错误类型
 */
class RequestError extends Error {
    constructor(
        message: string,
        public status?: number,
        public statusText?: string
    ) {
        super(message);
        this.name = 'RequestError';
    }
}

/**
 * @description 超时错误类
 */
class TimeoutError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'TimeoutError';
    }
}

/**
 * @description 创建一个可以被中断的Promise
 * @param promise 原始Promise
 * @param timeout 超时时间
 */
const withTimeout = <T>(promise: Promise<T>, timeout: number): Promise<T> => {
    return new Promise((resolve, reject) => {
        const timeoutId = setTimeout(() => {
            reject(new TimeoutError(`Request timed out after ${timeout}ms`));
        }, timeout);

        promise.then(
            (result) => {
                clearTimeout(timeoutId);
                resolve(result);
            },
            (error) => {
                clearTimeout(timeoutId);
                reject(error);
            }
        );
    });
};

interface RequestOptions extends RequestInit {
    timeout?: number;
}

interface ResponseData<T = any> {
    data: T;
    status: number;
    statusText: string;
    headers: Headers;
}

/**
 * @description 封装的fetch请求
 * @param url 请求URL
 * @param options 请求选项
 * @returns Promise<ResponseData>
 */
export const request = async <T = any>(
    url: string,
    options: RequestOptions = {}
): Promise<ResponseData<T>> => {
    const {
        timeout = 10000, // 默认10秒超时
        headers = {},
        ...restOptions
    } = options;

    // 合并默认headers
    const defaultHeaders = {
        'Content-Type': 'application/json',
    };

    const finalOptions: RequestInit = {
        ...restOptions,
        headers: { ...defaultHeaders, ...headers },
    };

    try {
        const fetchPromise = fetch(url, finalOptions);
        const response = await withTimeout(fetchPromise, timeout);

        if (!response.ok) {
            throw new RequestError(
                `HTTP error! status: ${response.status}`,
                response.status,
                response.statusText
            );
        }

        const data = await response.json();

        return {
            data,
            status: response.status,
            statusText: response.statusText,
            headers: response.headers,
        };
    } catch (error) {
        if (error instanceof TimeoutError || error instanceof RequestError) {
            throw error;
        }
        if (error instanceof Error) {
            throw new RequestError(error.message);
        }
        throw new RequestError('An unknown error occurred');
    }
};

/**
 * @description GET请求
 * @param url 请求URL
 * @param options 请求选项
 */
export const get = <T = any>(url: string, options?: RequestOptions): Promise<ResponseData<T>> => {
    return request<T>(url, { ...options, method: 'GET' });
};

/**
 * @description POST请求
 * @param url 请求URL
 * @param data 请求数据
 * @param options 请求选项
 */
export const post = <T = any>(
    url: string,
    data?: any,
    options?: RequestOptions
): Promise<ResponseData<T>> => {
    return request<T>(url, {
        ...options,
        method: 'POST',
        body: JSON.stringify(data),
    });
};
