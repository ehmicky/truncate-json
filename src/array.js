import { transformProp } from './prop.js'
import { getArrayItemSize } from './size.js'

// Recurse over array items.
// Omitted items are filtered out.
//  - Otherwise, `JSON.stringify()` would transform them to `null`
export const recurseArray = function ({
  array,
  omittedProps,
  path,
  size,
  maxSize,
  truncateValue,
}) {
  const newArray = []
  // eslint-disable-next-line fp/no-let
  let state = { empty: true, size, omittedProps }

  // eslint-disable-next-line fp/no-loops, fp/no-mutation, fp/no-let
  for (let index = 0; index < array.length; index += 1) {
    const increment = getArrayItemSize(state.empty)
    // eslint-disable-next-line fp/no-mutation
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

    // eslint-disable-next-line max-depth
    if (state.value !== undefined) {
      // eslint-disable-next-line fp/no-mutating-methods
      newArray.push(state.value)
    }
  }

  return { value: newArray, size: state.size, omittedProps: state.omittedProps }
}
