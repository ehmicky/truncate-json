import { addSize } from './size.js'

// Truncate an object property or an array item
// eslint-disable-next-line max-lines-per-function
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
    size: sizeA,
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

  if (stop) {
    return { empty, size: sizeA, truncatedProps: truncatedPropsA }
  }

  const {
    value: valueA,
    size: sizeB,
    truncatedProps: truncatedPropsB,
  } = truncateValue({
    value,
    truncatedProps,
    path: pathA,
    size: sizeA,
    maxSize,
    indent,
    depth: depth + 1,
  })
  return valueA === undefined
    ? { empty, size, truncatedProps: truncatedPropsB }
    : {
        empty: false,
        size: sizeB,
        value: valueA,
        truncatedProps: truncatedPropsB,
      }
}
