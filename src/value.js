import { truncateArray } from './array.js'
import { truncateObject } from './object.js'
import { addSize, getValueSize } from './size.js'

// Truncate a value to fit within a specific JSON size
export const truncateValue = function ({
  value,
  truncatedProps,
  path,
  size,
  maxSize,
  indent,
  depth,
}) {
  const increment = getValueSize(value)
  const {
    size: sizeA,
    stop,
    truncatedProps: truncatedPropsA,
  } = addSize({
    size,
    increment,
    maxSize,
    truncatedProps,
    path,
    value,
  })
  return stop
    ? { value: undefined, size: sizeA, truncatedProps: truncatedPropsA }
    : recurseValue({
        value,
        truncatedProps: truncatedPropsA,
        path,
        size: sizeA,
        maxSize,
        indent,
        depth,
      })
}

// Recurse over plain objects and arrays.
// We use a depth-first traversal.
//  - I.e. parent, then children, then siblings
//  - This allows stopping logic when `maxSize` is reached, resulting in
//    better performance
//  - This favors removing fewer big fields instead of more small fields,
//    resulting in fewer `truncatedProps`
//  - This favors maximizing the number of fields within the allowed `maxSize`
//  - This is easier to implement
const recurseValue = function ({
  value,
  truncatedProps,
  path,
  size,
  maxSize,
  indent,
  depth,
}) {
  if (typeof value !== 'object' || value === null) {
    return { value, size, truncatedProps }
  }

  return Array.isArray(value)
    ? truncateArray({
        array: value,
        truncatedProps,
        path,
        size,
        maxSize,
        truncateValue,
        indent,
        depth,
      })
    : truncateObject({
        object: value,
        truncatedProps,
        path,
        size,
        maxSize,
        truncateValue,
        indent,
        depth,
      })
}
