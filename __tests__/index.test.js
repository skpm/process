const process = require('../index')

test('should return an object', () => {
  expect(process.type).toBe('sketch')
  expect(typeof process.nextTick).toBe('function')
})
