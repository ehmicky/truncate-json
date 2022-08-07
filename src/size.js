import { getJsonLength, getJsonStringLength } from './length.js'

// Apply `maxSize`, which omits values if they their JSON size would be too
// high.
// Strings that are too long are completely omitted instead of being truncated:
//  - The truncation might make the value syntactically invalid, e.g. if it is a
//    serialized value
//  - This allows checking for strings being too large with `=== undefined`
//    instead of inspecting the `truncatedProps`
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

// Compute the JSON size of an array comma and whitespaces
export const getArrayItemSize = function (empty, indent, depth) {
  const indentSize = getIndentSize({ empty, indent, depth, keySpaceSize: 0 })
  const commaSize = getCommaSize(empty)
  return indentSize + commaSize
}

// Compute the JSON size of an object property key and whitespaces
export const getObjectPropSize = function ({ key, empty, indent, depth }) {
  const indentSize = getIndentSize({ empty, indent, depth, keySpaceSize: 1 })
  const keySize = getJsonStringLength(key)
  const commaSize = getCommaSize(empty)
  return indentSize + keySize + COLON_SIZE + commaSize
}

const COLON_SIZE = 1

// Compute the size of indentation of the object property or array item.
// If `empty`, also adds the size of the indentation of the parent {} or []
const getIndentSize = function ({ empty, indent, depth, keySpaceSize }) {
  if (indent === undefined) {
    return 0
  }

  const propSpaces = NEWLINE_SIZE + indent * (depth + 1)
  const parentSpaces = empty ? NEWLINE_SIZE + indent * depth : 0
  return keySpaceSize + propSpaces + parentSpaces
}

const NEWLINE_SIZE = 1

// Each object property or array item adds a comma, except the first one
const getCommaSize = function (empty) {
  return empty ? 0 : COMMA_SIZE
}

const COMMA_SIZE = 1
