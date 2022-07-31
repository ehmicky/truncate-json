import { recurseArray } from './array.js'
import { recurseObject } from './object.js'
import { addSize, getValueSize } from './size.js'

export default function truncateJson(jsonString, maxSize) {
  const value = parseJson(jsonString)
  const { value: valueA, omittedProps } = transformValue({
    value,
    omittedProps: [],
    path: [],
    size: 0,
    maxSize,
  })
  const jsonStringA = JSON.serialize(valueA)
  return { jsonString: jsonStringA, omittedProps }
}

const parseJson = function (jsonString) {
  if (typeof jsonString !== 'string') {
    throw new TypeError(`Input must be a JSON string: ${jsonString}`)
  }

  try {
    return JSON.parse(jsonString)
  } catch (error) {
    throw new Error(`Invalid JSON string: "${jsonString}"\n${error.message}`)
  }
}

// Recurse over plain objects and arrays.
// We use a depth-first traversal.
//  - I.e. parent, then children, then siblings
//  - This works better with `maxSize`
//     - This allows stopping logic when `maxSize` is reached, resulting in
//       better performance
//     - This favors removing fewer big fields instead of more small fields,
//       resulting in fewer `omittedProps`
//     - This favors maximizing the number of fields within the allowed
//       `maxSize`
//  - This is easier to implement
const transformValue = function ({ value, omittedProps, path, size, maxSize }) {
  const increment = getValueSize(value)
  const {
    size: sizeA,
    stop,
    omittedProps: omittedPropsA,
  } = addSize({
    size,
    increment,
    maxSize,
    omittedProps,
    path,
    value,
  })
  return stop
    ? { value: undefined, size, omittedProps: omittedPropsA }
    : recurseValue({
        value,
        omittedProps: omittedPropsA,
        path,
        size: sizeA,
        maxSize,
      })
}

const recurseValue = function ({ value, omittedProps, path, size, maxSize }) {
  if (typeof value !== 'object' || value === null) {
    return { value, size, omittedProps }
  }

  return Array.isArray(value)
    ? recurseArray({
        array: value,
        omittedProps,
        path,
        size,
        maxSize,
        transformValue,
      })
    : recurseObject({
        object: value,
        omittedProps,
        path,
        size,
        maxSize,
        transformValue,
      })
}
