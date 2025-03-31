/**
 * 存储工具函数
 */

/**
 * @description 设置localStorage，支持对象自动序列化
 * @param key 键名
 * @param value 值
 */
export const setLocalStorage = (key: string, value: any): void => {
    try {
        const serializedValue = JSON.stringify(value);
        localStorage.setItem(key, serializedValue);
    } catch (error) {
        console.error('Error saving to localStorage:', error);
    }
};

/**
 * @description 获取localStorage，支持对象自动反序列化
 * @param key 键名
 * @param defaultValue 默认值
 * @returns 存储的值或默认值
 */
export const getLocalStorage = <T>(key: string, defaultValue: T): T => {
    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
        console.error('Error reading from localStorage:', error);
        return defaultValue;
    }
};

/**
 * @description 删除localStorage中的项
 * @param key 键名
 */
export const removeLocalStorage = (key: string): void => {
    try {
        localStorage.removeItem(key);
    } catch (error) {
        console.error('Error removing from localStorage:', error);
    }
};

/**
 * @description 清空localStorage
 */
export const clearLocalStorage = (): void => {
    try {
        localStorage.clear();
    } catch (error) {
        console.error('Error clearing localStorage:', error);
    }
};
