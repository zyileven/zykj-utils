/**
 * 日期时间工具函数
 */

/**
 * @description 格式化日期时间
 * @param date 日期对象或时间戳
 * @param format 格式化模板，默认 'YYYY-MM-DD HH:mm:ss'
 * @returns 格式化后的日期字符串
 */
export const formatDate = (
    date: Date | number,
    format: string = 'YYYY-MM-DD HH:mm:ss'
): string => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');
    const seconds = String(d.getSeconds()).padStart(2, '0');

    return format
        .replace('YYYY', String(year))
        .replace('MM', month)
        .replace('DD', day)
        .replace('HH', hours)
        .replace('mm', minutes)
        .replace('ss', seconds);
};

/**
 * @description 获取相对时间描述
 * @param date 目标日期
 * @param now 当前日期（可选）
 * @returns 相对时间描述
 */
export const getRelativeTime = (date: Date | number, now: Date = new Date()): string => {
    const targetDate = new Date(date);
    const diff = now.getTime() - targetDate.getTime();
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 365) {
        return `${Math.floor(days / 365)}年前`;
    }
    if (days > 30) {
        return `${Math.floor(days / 30)}个月前`;
    }
    if (days > 0) {
        return `${days}天前`;
    }
    if (hours > 0) {
        return `${hours}小时前`;
    }
    if (minutes > 0) {
        return `${minutes}分钟前`;
    }
    return '刚刚';
};

/**
 * @description 判断是否为同一天
 * @param date1 第一个日期
 * @param date2 第二个日期
 * @returns 是否为同一天
 */
export const isSameDay = (date1: Date | number, date2: Date | number): boolean => {
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    return (
        d1.getFullYear() === d2.getFullYear() &&
        d1.getMonth() === d2.getMonth() &&
        d1.getDate() === d2.getDate()
    );
};
