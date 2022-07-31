import { stringToBytes, bytesToString } from './length.js'

// Truncate a top-level value.
// Unlike object properties and array items, top-level values are truncated
// instead of being omitted.
//  - This ensures the top-level value keeps its type and can be serialized to
//    JSON
// This also allows the input to be any valid JSON string
//  - As opposed to throwing if the top-level value is not an object or array
// Thanks to the minimum `maxSize`, only numbers or strings might be too big
// when used as a top-level value.
export const truncateTopValue = function (value, maxSize) {
  return typeof value === 'number'
    ? truncateNumber(value, maxSize)
    : truncateString(value, maxSize)
}

const truncateNumber = function (value, maxSize) {
  const valueString = truncateNumberPrecision(
    value,
    'toPrecision',
    maxSize,
    maxSize,
  )
  return valueString === undefined
    ? truncateNumberPrecision(value, 'toExponential', maxSize, maxSize)
    : valueString
}

// eslint-disable-next-line max-params
const truncateNumberPrecision = function (value, methodName, maxSize, size) {
  const valueString = value[methodName](size)
  const valueStringA = valueString.replace(TRIMMED_NUMBER_REGEXP, '$1')

  if (valueStringA.length <= maxSize) {
    return valueStringA
  }

  return size === 1
    ? undefined
    : truncateNumberPrecision(value, methodName, maxSize, size - 1)
}

// Trim trailing decimal zeros
const TRIMMED_NUMBER_REGEXP = /\.?0*($|e)/iu

const truncateString = function (value, maxSize) {
  const jsonString = JSON.stringify(value)
  const bytes = stringToBytes(jsonString)
  const truncatedBytes = bytes.slice(
    QUOTE.length,
    Math.min(maxSize - ELLIPSIS.length, bytes.length) - QUOTE.length,
  )
  const truncatedString = bytesToString(truncatedBytes)
  const truncatedStringA = truncatedString.replace(INVALID_END_CHARS, '')
  const truncatedStringB = fixUnicodeSequenceEnd(truncatedStringA)
  return `${QUOTE}${truncatedStringB}${ELLIPSIS}${QUOTE}`
}

// The truncation might happen either:
//  - Right after the backslash of a backslash sequence, leaving a single
//    backslash at the end
//  - In the middle of a multibyte Unicode sequence, which is then replaced
//    by \ufffd by TextDecoder
// We trim both.
const INVALID_END_CHARS = /\uFFFD|\\$/u

// The truncation might happen in the middle of a \u sequence, which is invalid
// JSON. We trim it.
const fixUnicodeSequenceEnd = function (truncatedString) {
  try {
    JSON.parse(`${QUOTE}${truncatedString}${QUOTE}`)
    return truncatedString
  } catch {
    return fixUnicodeSequenceEnd(truncatedString.slice(0, -1))
  }
}

const QUOTE = '"'
const ELLIPSIS = '...'
