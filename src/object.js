import { truncateProp } from './prop.js'
import { getObjectPropSize } from './size.js'

// Recurse over object properties.
// Use imperative logic for performance reasons.
/* eslint-disable fp/no-let, fp/no-loops, fp/no-mutation, max-depth */
export const truncateObject = function ({
  object,
  omittedProps,
  path,
  size,
  maxSize,
  truncateValue,
}) {
  const newObject = {}
  let state = { empty: true, size, omittedProps }

  // eslint-disable-next-line guard-for-in
  for (const key in object) {
    const increment = getObjectPropSize(key, state.empty)

    state = truncateProp({
      parent: object,
      omittedProps: state.omittedProps,
      path,
      increment,
      maxSize,
      key,
      empty: state.empty,
      size: state.size,
      truncateValue,
    })

    if (state.value !== undefined) {
      newObject[key] = state.value
    }
  }

  return {
    value: newObject,
    size: state.size,
    omittedProps: state.omittedProps,
  }
}
/* eslint-enable fp/no-let, fp/no-loops, fp/no-mutation, max-depth */
