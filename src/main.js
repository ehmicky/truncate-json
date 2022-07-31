import { recurseArray } from './array.js'
import { recurseObject } from './object.js'
import { addSize, getValueSize } from './size.js'

export default function truncateJson(jsonString, maxSize) {
  const value = JSON.parse(jsonString)
  const omittedProps = []
  const { value: newValue } = transformValue({
    value,
    omittedProps,
    path: [],
    size: 0,
    maxSize,
  })
  const jsonStringA = JSON.serialize(newValue)
  return { jsonString: jsonStringA, omittedProps }
}

// Recurse over plain objects and arrays.
// We use a depth-first traversal.
//  - I.e. parent, then children, then siblings
//  - This works better with `maxSize`
//     - This allows stopping logic when `maxSize` is reached, resulting in
//       better performance
//     - This favors removing fewer big fields instead of more small fields,
//       resulting in fewer `changes`
//     - This favors maximizing the number of fields within the allowed
//       `maxSize`
//  - This is easier to implement
const transformValue = function ({ value, omittedProps, path, size, maxSize }) {
  const increment = getValueSize(value)
  const { size: sizeA, stop } = addSize({
    size,
    increment,
    maxSize,
    omittedProps,
    path,
    value,
  })
  return stop
    ? { value: undefined, size }
    : recurseValue({ value, omittedProps, path, size: sizeA, maxSize })
}

const recurseValue = function ({
  value,
  changes,
  omittedProps,
  path,
  size,
  maxSize,
}) {
  if (typeof value !== 'object' || value === null) {
    return { value, size }
  }

  return Array.isArray(value)
    ? recurseArray({
        array: value,
        changes,
        omittedProps,
        path,
        size,
        maxSize,
        transformValue,
      })
    : recurseObject({
        object: value,
        changes,
        omittedProps,
        path,
        size,
        maxSize,
        transformValue,
      })
}
