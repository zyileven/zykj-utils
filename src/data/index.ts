/**
 * 数据处理工具函数
 */

/**
 * @description 深拷贝对象
 * @param obj 要拷贝的对象
 * @returns 拷贝后的新对象
 */
export const deepClone = <T extends Record<string, any> | any[] | Date | RegExp | null | undefined | string | number | boolean>(
    obj: T
): T => {
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }

    if (obj instanceof Date) {
        return new Date(obj.getTime()) as T;
    }

    if (obj instanceof RegExp) {
        return new RegExp(obj) as T;
    }

    if (Array.isArray(obj)) {
        return obj.map((item) => deepClone(item)) as T;
    }

    const result = {} as Record<string, any>;
    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            result[key] = deepClone(obj[key]);
        }
    }
    
    return result as T;
};

/**
 * @description 数组去重
 * @param arr 要去重的数组
 * @param key 如果数组元素是对象，可以指定用于比较的键
 * @returns 去重后的新数组
 */
export const uniqueArray = <T>(arr: T[], key?: keyof T): T[] => {
    if (key) {
        const seen = new Set();
        return arr.filter((item) => {
            const value = item[key];
            if (seen.has(value)) {
                return false;
            }
            seen.add(value);
            return true;
        });
    }
    return Array.from(new Set(arr));
};

/**
 * @description 对象数组按指定键排序
 * @param arr 要排序的数组
 * @param key 排序键
 * @param order 排序方向
 * @returns 排序后的新数组
 */
export const sortArrayByKey = <T>(
    arr: T[],
    key: keyof T,
    order: 'asc' | 'desc' = 'asc'
): T[] => {
    return [...arr].sort((a, b) => {
        if (a[key] < b[key]) return order === 'asc' ? -1 : 1;
        if (a[key] > b[key]) return order === 'asc' ? 1 : -1;
        return 0;
    });
};

/**
 * @description 分组对象数组
 * @param arr 要分组的数组
 * @param key 分组键
 * @returns 分组后的对象
 */
export const groupBy = <T>(arr: T[], key: keyof T): Record<string, T[]> => {
    return arr.reduce((groups, item) => {
        const groupKey = String(item[key]);
        if (!groups[groupKey]) {
            groups[groupKey] = [];
        }
        groups[groupKey].push(item);
        return groups;
    }, {} as Record<string, T[]>);
};
