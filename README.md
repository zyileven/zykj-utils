# zykj-utils

一个实用的 TypeScript 工具库，提供了常用的工具函数集合。

## 安装

```bash
npm install zykj-utils
# 或
yarn add zykj-utils
# 或
pnpm add zykj-utils
```

## 工具函数

### URL 工具

- `updateQueryParameter(queryKey: string, queryValue: string)`: 安全更新 URL 查询参数并保留历史记录
- `getUrlParameter(name: string, url?: string)`: 获取 URL 中指定参数的值
- `parseUrlParams(url?: string)`: 解析 URL 参数为对象

### 日期时间工具

- `formatDate(date: Date | number, format?: string)`: 格式化日期时间，支持自定义格式
- `getRelativeTime(date: Date | number, now?: Date)`: 获取相对时间描述（如：3天前）
- `isSameDay(date1: Date | number, date2: Date | number)`: 判断是否为同一天

### 存储工具

- `setLocalStorage(key: string, value: any)`: 设置 localStorage，支持对象自动序列化
- `getLocalStorage<T>(key: string, defaultValue: T)`: 获取 localStorage，支持对象自动反序列化
- `removeLocalStorage(key: string)`: 删除 localStorage 中的项
- `clearLocalStorage()`: 清空 localStorage

### 数据验证工具

- `isValidPhone(phone: string)`: 验证手机号
- `isValidEmail(email: string)`: 验证邮箱
- `isValidIdCard(idCard: string)`: 验证身份证号
- `isEmpty(value: any)`: 验证是否为空值

### DOM 操作工具

- `getElementPosition(element: HTMLElement)`: 获取元素的绝对位置
- `isElementInViewport(element: HTMLElement, partiallyVisible?: boolean)`: 判断元素是否在视口中可见
- `addEventListenerWithCleanup(element, event, handler, options?)`: 添加可清理的事件监听器

### 网络请求工具

- `request<T>(url: string, options?: RequestOptions)`: 封装的 fetch 请求
- `get<T>(url: string, options?: RequestOptions)`: GET 请求快捷方法
- `post<T>(url: string, data?: any, options?: RequestOptions)`: POST 请求快捷方法

### 数学计算工具

- `add(num1: number, num2: number)`: 数字精确加法
- `subtract(num1: number, num2: number)`: 数字精确减法
- `formatNumber(num: number, decimals?: number)`: 数字千分位格式化
- `random(min: number, max: number, decimals?: number)`: 生成指定范围的随机数

### 数据处理工具

- `deepClone<T>(obj: T)`: 深拷贝对象
- `uniqueArray<T>(arr: T[], key?: keyof T)`: 数组去重，支持对象数组
- `sortArrayByKey<T>(arr: T[], key: keyof T, order?: 'asc' | 'desc')`: 对象数组按指定键排序
- `groupBy<T>(arr: T[], key: keyof T)`: 分组对象数组

## 使用示例

```typescript
import { formatDate, deepClone, isValidEmail } from 'zykj-utils';

// 格式化日期
const date = formatDate(new Date(), 'YYYY-MM-DD');
console.log(date); // 2025-03-31

// 深拷贝对象
const obj = { a: 1, b: { c: 2 } };
const cloned = deepClone(obj);

// 验证邮箱
const isValid = isValidEmail('example@email.com');
console.log(isValid); // true
```

## 许可证

ISC
