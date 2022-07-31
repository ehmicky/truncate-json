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
  transformValue,
}) {
  const value = parent[key]
  const propPath = [...path, key]
  const {
    size: sizeA,
    stop,
    omittedProps: omittedPropsA,
  } = addSize({
    size,
    increment,
    maxSize,
    omittedProps,
    path: propPath,
    value,
  })

  if (stop) {
    return { empty, size: sizeA, omittedProps: omittedPropsA }
  }

  const {
    value: valueA,
    size: sizeB,
    omittedProps: omittedPropsB,
  } = transformValue({
    value,
    omittedProps,
    path: propPath,
    size: sizeA,
    maxSize,
  })
  return valueA === undefined
    ? { empty, size, omittedProps: omittedPropsB }
    : { empty: false, size: sizeB, value: valueA, omittedProps: omittedPropsB }
}
