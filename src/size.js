import { getJsonLength, getJsonStringLength } from './length.js'

// Apply `maxSize`, which omits values if they their JSON size would be too
// high.
// Strings that are too long are completely omitted instead of being truncated:
//  - The truncation might make the value syntactically invalid, e.g. if it is a
//    serialized value
//  - This allows checking for strings being too large with `=== undefined`
//    instead of inspecting the `truncatedProps`
// The top-level value itself might become `undefined` if either:
//  - The `maxSize` option is very low (which is unlikely)
//  - The top-level value is a very long string
// This is applied incrementally, in a depth-first manner, so that omitted
// fields (due to being over `maxSize`) and their children are not processed
// at all, for performance reason.
export const addSize = function ({
  size,
  increment,
  maxSize,
  truncatedProps,
  path,
  value,
}) {
  const newSize = size + increment
  const stop = newSize > maxSize
  return stop
    ? { size, stop, truncatedProps: [...truncatedProps, { path, value }] }
    : { size: newSize, stop, truncatedProps }
}

// Compute the JSON size of a property value or top-level value
export const getValueSize = function (value) {
  return getJsonLength(value)
}

// Compute the JSON size of an array comma
export const getArrayItemSize = function (empty) {
  return empty ? 0 : 1
}

// Compute the JSON size of an object property key
export const getObjectPropSize = function (key, empty) {
  return getJsonStringLength(key) + (empty ? 1 : 2)
}
