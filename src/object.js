import { transformProp } from './prop.js'
import { getObjectPropSize } from './size.js'

// Recurse over object properties.
// Omitted properties are completely ignored (as opposed to have a key but an
// `undefined` value).
// We iterate in `Reflect.ownKeys()` order, not in sorted keys order.
//  - This is faster
//  - This preserves the object properties order
export const recurseObject = function ({
  object,
  omittedProps,
  path,
  size,
  maxSize,
  transformValue,
}) {
  const newObject = {}
  // eslint-disable-next-line fp/no-let
  let state = { empty: true, size, omittedProps }

  // eslint-disable-next-line fp/no-loops, guard-for-in
  for (const key in object) {
    const increment = getObjectPropSize(key, state.empty)
    // eslint-disable-next-line fp/no-mutation
    state = transformProp({
      parent: object,
      omittedProps: state.omittedProps,
      path,
      increment,
      maxSize,
      key,
      empty: state.empty,
      size: state.size,
      transformValue,
    })

    // eslint-disable-next-line max-depth
    if (state.value !== undefined) {
      // eslint-disable-next-line fp/no-mutation
      newObject[key] = state.value
    }
  }

  return {
    value: newObject,
    size: state.size,
    omittedProps: state.omittedProps,
  }
}
