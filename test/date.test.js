// test/date.test.js
import { formatDate } from '../src/date'
test('格式化时间戳', () => {
    expect(formatDate(1620000000000)).toBe('2021-05-03T00:00:00.000Z')
})