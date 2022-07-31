// Retrieve the JSON length of a value, excluding its children.
// eslint-disable-next-line max-statements, complexity
export const getJsonLength = function (value) {
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
export const getJsonStringLength = function (string) {
  return stringByteLength(JSON.stringify(string))
}

// Retrieve a string's byte length
const stringByteLength = function (string) {
  return stringToBytes(string).length
}

// Like `string.slice(start, end)` but bytewise (UTF-8).
export const stringByteSlice = function (string, start, end) {
  const bytes = stringToBytes(string)
  const truncatedBytes = bytes.slice(start, end)
  const truncatedString = bytesToString(truncatedBytes)
  return truncatedString.endsWith(INVALID_END_CHAR)
    ? truncatedString.slice(0, -1)
    : truncatedString
}

// The truncation might happen in the middle of a multibyte Unicode sequence,
// which is then replaced by \ufffd by TextDecoder. We trim it.
const INVALID_END_CHAR = '\uFFFD'

// Turn a string into a UTF-8 bytes array
const stringToBytes = function (string) {
  return textEncoder.encode(string)
}

const textEncoder = new TextEncoder()

// Inverse
const bytesToString = function (bytes) {
  return textDecoder.decode(bytes)
}

const textDecoder = new TextDecoder()
