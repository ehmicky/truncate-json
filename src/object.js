import { transformProp } from './prop.js'
import { getObjectPropSize } from './size.js'

// Recurse over object properties.
// Omitted properties are completely ignored (as opposed to have a key but an
// `undefined` value).
// We iterate in `Reflect.ownKeys()` order, not in sorted keys order.
//  - This is faster
//  - This preserves the object properties order
// Use imperative logic for performance reasons.
/* eslint-disable fp/no-let, fp/no-loops, fp/no-mutation, max-depth */
export const recurseObject = function ({
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

    state = transformProp({
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
