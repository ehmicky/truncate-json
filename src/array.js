import { transformProp } from './prop.js'
import { getArrayItemSize } from './size.js'

// Recurse over array items.
// Omitted items are filtered out.
//  - Otherwise, `JSON.stringify()` would transform them to `null`
// Use imperative logic for performance reasons.
/* eslint-disable fp/no-let, fp/no-loops, fp/no-mutation,
   fp/no-mutating-methods, max-depth */
export const recurseArray = function ({
  array,
  omittedProps,
  path,
  size,
  maxSize,
  truncateValue,
}) {
  const newArray = []

  let state = { empty: true, size, omittedProps }

  for (let index = 0; index < array.length; index += 1) {
    const increment = getArrayItemSize(state.empty)

    state = transformProp({
      parent: array,
      omittedProps: state.omittedProps,
      path,
      increment,
      maxSize,
      key: index,
      empty: state.empty,
      size: state.size,
      truncateValue,
    })

    if (state.value !== undefined) {
      newArray.push(state.value)
    }
  }

  return { value: newArray, size: state.size, omittedProps: state.omittedProps }
}
/* eslint-enable fp/no-let, fp/no-loops, fp/no-mutation,
   fp/no-mutating-methods, max-depth */
