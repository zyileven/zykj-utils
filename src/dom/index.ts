/**
 * DOM操作工具函数
 */

/**
 * @description 获取元素的绝对位置
 * @param element 目标元素
 * @returns 元素的位置信息
 */
export const getElementPosition = (element: HTMLElement) => {
    const rect = element.getBoundingClientRect();
    return {
        top: rect.top + window.scrollY,
        left: rect.left + window.scrollX,
        width: rect.width,
        height: rect.height
    };
};

/**
 * @description 判断元素是否在视口中可见
 * @param element 目标元素
 * @param partiallyVisible 是否允许部分可见
 * @returns 是否可见
 */
export const isElementInViewport = (
    element: HTMLElement,
    partiallyVisible: boolean = false
): boolean => {
    const rect = element.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    const windowWidth = window.innerWidth || document.documentElement.clientWidth;

    if (partiallyVisible) {
        return (
            rect.top < windowHeight &&
            rect.bottom > 0 &&
            rect.left < windowWidth &&
            rect.right > 0
        );
    }

    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= windowHeight &&
        rect.right <= windowWidth
    );
};

/**
 * @description 添加事件监听器（支持移除）
 * @param element 目标元素
 * @param event 事件名称
 * @param handler 事件处理函数
 * @param options 事件选项
 * @returns 移除事件监听器的函数
 */
export const addEventListenerWithCleanup = (
    element: HTMLElement | Window | Document,
    event: string,
    handler: EventListenerOrEventListenerObject,
    options?: boolean | AddEventListenerOptions
): () => void => {
    element.addEventListener(event, handler, options);
    return () => element.removeEventListener(event, handler, options);
};
