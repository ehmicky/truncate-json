// We use `JSON.stringify()` to compute the length of strings (including
// property keys) to take into account escaping, including:
//  - Control characters and Unicode characters
//  - Invalid Unicode sequences
// We use `TextEncoder()` to compute the UTF-8 byte length, not the character
// length like `string.length`.
export const getJsonLength = function (value) {
  const jsonString = JSON.stringify(value)
  return NO_STRING_JSON_TYPES.has(typeof value)
    ? jsonString.length
    : stringToBytes(jsonString).length
}

// For those types, the character length is the same as the UTF-8 byte length
const NO_STRING_JSON_TYPES = new Set(['null', 'number', 'boolean'])

// Turn a string into a UTF-8 bytes array
export const stringToBytes = function (string) {
  return textEncoder.encode(string)
}

const textEncoder = new TextEncoder()

// Inverse
export const bytesToString = function (bytes) {
  return textDecoder.decode(bytes)
}

const textDecoder = new TextDecoder()
