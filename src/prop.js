import { addSize } from './size.js'

// Transform an object property or an array item
export const transformProp = function ({
  parent,
  changes,
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
  const { size: sizeA, stop } = addSize({
    size,
    increment,
    maxSize,
    changes,
    path: propPath,
    value,
  })

  if (stop) {
    return { empty, size }
  }

  const { value: valueA, size: sizeB } = transformValue({
    value,
    changes,
    omittedProps,
    path: propPath,
    size: sizeA,
    maxSize,
  })
  return valueA === undefined
    ? { empty, size }
    : { empty: false, size: sizeB, value: valueA }
}
