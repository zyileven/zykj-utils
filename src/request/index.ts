/**
 * 网络请求工具函数
 */

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
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        return {
            data,
            status: response.status,
            statusText: response.statusText,
            headers: response.headers,
        };
    } catch (error) {
        if (error instanceof TimeoutError) {
            throw error;
        }
        throw new Error(`Request failed: ${error.message}`);
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
