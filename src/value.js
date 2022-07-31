import { truncateArray } from './array.js'
import { truncateObject } from './object.js'
import { addSize, getValueSize } from './size.js'

// Truncate a value to fit within a specific JSON size
export const truncateValue = function ({
  value,
  omittedProps,
  path,
  size,
  maxSize,
}) {
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
    ? { value: undefined, size: sizeA, omittedProps: omittedPropsA }
    : recurseValue({
        value,
        omittedProps: omittedPropsA,
        path,
        size: sizeA,
        maxSize,
      })
}

// Recurse over plain objects and arrays.
// We use a depth-first traversal.
//  - I.e. parent, then children, then siblings
//  - This allows stopping logic when `maxSize` is reached, resulting in
//    better performance
//  - This favors removing fewer big fields instead of more small fields,
//    resulting in fewer `omittedProps`
//  - This favors maximizing the number of fields within the allowed `maxSize`
//  - This is easier to implement
const recurseValue = function ({ value, omittedProps, path, size, maxSize }) {
  if (typeof value !== 'object' || value === null) {
    return { value, size, omittedProps }
  }

  return Array.isArray(value)
    ? truncateArray({
        array: value,
        omittedProps,
        path,
        size,
        maxSize,
        truncateValue,
      })
    : truncateObject({
        object: value,
        omittedProps,
        path,
        size,
        maxSize,
        truncateValue,
      })
}
