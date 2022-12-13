import stringByteLength from 'string-byte-length'

// Retrieve the JSON length of a value, excluding its children.
// eslint-disable-next-line max-statements, complexity
export const getJsonLength = (value) => {
  if (value === null) {
    return NULL_LENGTH
  }

  if (value === true) {
    return TRUE_LENGTH
  }

  if (value === false) {
    return FALSE_LENGTH
  }

  const type = typeof value

  if (type === 'object') {
    return OBJ_ARR_LENGTH
  }

  if (type === 'number') {
    return JSON.stringify(value).length
  }

  return getJsonStringLength(value)
}

const NULL_LENGTH = 4
const TRUE_LENGTH = 4
const FALSE_LENGTH = 5
const OBJ_ARR_LENGTH = 2

// We use `JSON.stringify()` to compute the length of strings (including
// property keys) to take into account escaping, including:
//  - Control characters and Unicode characters
//  - Invalid Unicode sequences
export const getJsonStringLength = (string) =>
  stringByteLength(JSON.stringify(string))
