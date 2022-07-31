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
