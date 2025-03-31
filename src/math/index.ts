/**
 * 数学计算工具函数
 */

/**
 * @description 数字精确加法
 * @param num1 第一个数
 * @param num2 第二个数
 * @returns 计算结果
 */
export const add = (num1: number, num2: number): number => {
    const num1Digits = (num1.toString().split('.')[1] || '').length;
    const num2Digits = (num2.toString().split('.')[1] || '').length;
    const baseNum = Math.pow(10, Math.max(num1Digits, num2Digits));
    return (num1 * baseNum + num2 * baseNum) / baseNum;
};

/**
 * @description 数字精确减法
 * @param num1 第一个数
 * @param num2 第二个数
 * @returns 计算结果
 */
export const subtract = (num1: number, num2: number): number => {
    const num1Digits = (num1.toString().split('.')[1] || '').length;
    const num2Digits = (num2.toString().split('.')[1] || '').length;
    const baseNum = Math.pow(10, Math.max(num1Digits, num2Digits));
    return (num1 * baseNum - num2 * baseNum) / baseNum;
};

/**
 * @description 数字千分位格式化
 * @param num 要格式化的数字
 * @param decimals 保留小数位数
 * @returns 格式化后的字符串
 */
export const formatNumber = (num: number, decimals: number = 2): string => {
    return num.toLocaleString('zh-CN', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
    });
};

/**
 * @description 随机数生成
 * @param min 最小值
 * @param max 最大值
 * @param decimals 小数位数
 * @returns 随机数
 */
export const random = (min: number, max: number, decimals: number = 0): number => {
    const rand = Math.random() * (max - min) + min;
    const power = Math.pow(10, decimals);
    return Math.round(rand * power) / power;
};
