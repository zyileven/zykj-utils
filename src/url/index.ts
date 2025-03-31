/**
 * URL相关工具函数
 */

/**
 * @description 安全更新 URL 查询参数并保留历史记录
 * @param queryKey 需要更新的查询参数键名
 * @param queryValue 需要设置的参数值（传入空字符串会删除该参数）
 */
export const updateQueryParameter = (queryKey: string, queryValue: string) => {
    const searchParams = new URLSearchParams(window.location.search);

    // 处理空值情况
    if (queryValue.trim() === '') {
        searchParams.delete(queryKey);
    } else {
        searchParams.set(queryKey, queryValue);
    }

    // 构建新 URL
    const newURL = new URL(window.location.href);
    newURL.search = searchParams.toString();

    // 更新浏览器历史记录
    window.history.replaceState(null, '', newURL);
};

/**
 * @description 获取URL中指定参数的值
 * @param name 参数名
 * @param url 可选，默认为当前页面URL
 * @returns 参数值或null
 */
export const getUrlParameter = (name: string, url?: string): string | null => {
    const searchParams = new URLSearchParams(
        url ? new URL(url).search : window.location.search
    );
    return searchParams.get(name);
};

/**
 * @description 解析URL参数为对象
 * @param url 可选，默认为当前页面URL
 * @returns 包含所有参数的对象
 */
export const parseUrlParams = (url?: string): Record<string, string> => {
    const searchParams = new URLSearchParams(
        url ? new URL(url).search : window.location.search
    );
    const params: Record<string, string> = {};
    searchParams.forEach((value, key) => {
        params[key] = value;
    });
    return params;
};
