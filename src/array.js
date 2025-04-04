import { truncateProp } from './prop.js'
import { getArrayItemSize } from './size.js'

// Recurse over array items.
// Omitted items are filtered out.
//  - Otherwise, `JSON.stringify()` would transform them to `null`
// Use imperative logic for performance reasons.
/* eslint-disable fp/no-let, fp/no-loops, fp/no-mutation, max-depth */
export const truncateArray = ({
  array,
  truncatedProps,
  path,
  size,
  maxSize,
  truncateValue,
  indent,
  depth,
}) => {
  const newArray = []
  let state = { empty: true, size, truncatedProps }

  for (let index = 0; index < array.length; index += 1) {
    const increment = getArrayItemSize(state.empty, indent, depth)

    state = truncateProp({
      parent: array,
      truncatedProps: state.truncatedProps,
      path,
      increment,
      maxSize,
      key: index,
      empty: state.empty,
      size: state.size,
      truncateValue,
      indent,
      depth,
    })

    if (state.value !== undefined) {
      // eslint-disable-next-line fp/no-mutating-methods
      newArray.push(state.value)
    }
  }

  return {
    value: newArray,
    size: state.size,
    truncatedProps: state.truncatedProps,
  }
}
/* eslint-enable fp/no-let, fp/no-loops, fp/no-mutation, max-depth */
