import { addSize } from './size.js'

// Transform an object property or an array item
export const transformProp = function ({
  parent,
  omittedProps,
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
    omittedProps: omittedPropsA,
  } = addSize({
    size,
    increment,
    maxSize,
    omittedProps,
    path: pathA,
    value,
  })

  if (stop) {
    return { empty, size: sizeA, omittedProps: omittedPropsA }
  }

  const {
    value: valueA,
    size: sizeB,
    omittedProps: omittedPropsB,
  } = truncateValue({
    value,
    omittedProps,
    path: pathA,
    size: sizeA,
    maxSize,
  })
  return valueA === undefined
    ? { empty, size, omittedProps: omittedPropsB }
    : { empty: false, size: sizeB, value: valueA, omittedProps: omittedPropsB }
}
