// This is the fastest method since it uses C++ (v8::String::Utf8Length())
// However, it is only available in Node.js.
// Faster than `Buffer.from(string).length`.
const getNodeByteLength = function (string) {
  // We do not import 'buffer' so it works in browsers
  // eslint-disable-next-line n/prefer-global/buffer
  return globalThis.Buffer.byteLength(string)
}

// This is:
//  - Available on any platform unlike:
//     - `new Blob([string]).size`
//     - `new TextEncoder().encode(string).length`
//  - Faster than any of the above, and also than any methods relying on
//    `encodeURI()` or `encodeURIComponent()`
// TODO: ensure invalid surrogate pairs have same size as the way they would
// be serialized.
// Uses imperative code for performance
/* eslint-disable complexity, max-statements, fp/no-let, fp/no-loops, max-depth,
   fp/no-mutation, no-magic-numbers */
const getStringByteLength = function (string) {
  const charLength = string.length
  let byteLength = 0

  for (let charIndex = 0; charIndex < charLength; charIndex += 1) {
    const codepoint = string.codePointAt(charIndex)

    if (codepoint < 0x80) {
      byteLength += 1
    } else if (codepoint < 0x8_00) {
      byteLength += 2
    } else if (codepoint < 0x1_00_00) {
      byteLength += 3
    } else {
      byteLength += 4
      charIndex += 1
    }
  }

  return byteLength
}
/* eslint-enable complexity, max-statements, fp/no-let, fp/no-loops, max-depth,
   fp/no-mutation, no-magic-numbers */

// Retrieve a string's byte length
export const stringByteLength =
  'Buffer' in globalThis ? getNodeByteLength : getStringByteLength

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
