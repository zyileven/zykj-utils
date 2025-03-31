
// 定义一个方法
function add(a: number, b:number) {
    return a + b;
}

// 定义另一个方法
function subtract(a: number, b: number) {
    return a - b;
}

// 实现一个数组去重方法
function uniqueArray(arr: Array<any>) {
    return [...new Set(arr)];
}

export { add, subtract, uniqueArray }