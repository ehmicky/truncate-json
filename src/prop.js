import { addSize } from './size.js'

// Truncate an object property or an array item
export const truncateProp = function ({
  parent,
  truncatedProps,
  path,
  increment,
  maxSize,
  key,
  empty,
  size,
  truncateValue,
  indent,
  depth,
}) {
  const value = parent[key]
  const pathA = [...path, key]
  const {
    size: newSize,
    stop,
    truncatedProps: truncatedPropsA,
  } = addSize({
    size,
    increment,
    maxSize,
    truncatedProps,
    path: pathA,
    value,
  })

  return stop
    ? { empty, size: newSize, truncatedProps: truncatedPropsA }
    : truncatePropValue({
        value,
        truncatedProps,
        path: pathA,
        maxSize,
        empty,
        size,
        newSize,
        truncateValue,
        indent,
        depth,
      })
}

const truncatePropValue = function ({
  value,
  truncatedProps,
  path,
  maxSize,
  empty,
  size,
  newSize,
  truncateValue,
  indent,
  depth,
}) {
  const {
    value: valueA,
    size: newSizeA,
    truncatedProps: truncatedPropsB,
  } = truncateValue({
    value,
    truncatedProps,
    path,
    size: newSize,
    maxSize,
    indent,
    depth: depth + 1,
  })
  return valueA === undefined
    ? { empty, size, truncatedProps: truncatedPropsB }
    : {
        empty: false,
        size: newSizeA,
        value: valueA,
        truncatedProps: truncatedPropsB,
      }
}
