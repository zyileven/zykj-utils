/**
 * 数据验证工具函数
 */

/**
 * @description 验证手机号
 * @param phone 手机号
 * @returns 是否为有效手机号
 */
export const isValidPhone = (phone: string): boolean => {
    return /^1[3-9]\d{9}$/.test(phone);
};

/**
 * @description 验证邮箱
 * @param email 邮箱地址
 * @returns 是否为有效邮箱
 */
export const isValidEmail = (email: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

/**
 * @description 验证身份证号
 * @param idCard 身份证号
 * @returns 是否为有效身份证号
 */
export const isValidIdCard = (idCard: string): boolean => {
    return /^[1-9]\d{5}(19|20)\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])\d{3}[\dXx]$/.test(idCard);
};

/**
 * @description 验证是否为空值
 * @param value 要验证的值
 * @returns 是否为空值
 */
export const isEmpty = (value: any): boolean => {
    if (value === null || value === undefined) {
        return true;
    }
    if (typeof value === 'string') {
        return value.trim() === '';
    }
    if (Array.isArray(value)) {
        return value.length === 0;
    }
    if (typeof value === 'object') {
        return Object.keys(value).length === 0;
    }
    return false;
};
