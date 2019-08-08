const EventEmitter = require("events");
const process = require("../index");

test("should be an instance of EventEmitter", () => {
  expect(process instanceof EventEmitter).toBe(true);
});

test("should return an object with some properties", () => {
  expect(process.type).toBe("sketch");
  expect(typeof process.nextTick).toBe("function");
});
