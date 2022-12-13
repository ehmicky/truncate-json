import guessJsonIndent from 'guess-json-indent'

import { truncateNumber } from './number.js'
import { validateOptions } from './options.js'
import { truncateString } from './string.js'
import { truncateValue } from './value.js'

// Truncate a JSON string
const truncateJson = (jsonString, maxSize) => {
  validateOptions(jsonString, maxSize)
  const indent = getIndent(jsonString)
  const value = parseJson(jsonString)
  const { value: newValue, truncatedProps } = truncateValue({
    value,
    truncatedProps: [],
    path: [],
    size: 0,
    maxSize,
    indent,
    depth: 0,
  })
  const newJsonString = serializeJson({ newValue, value, maxSize, indent })
  return { jsonString: newJsonString, truncatedProps }
}

export default truncateJson

// Guesses the indentation to take it into account.
// We do not provide an option for it, relying on detection only:
//  - This results in a simpler API
//  - This is good in most cases, and in the few cases where it is not, one can
//    fix it by re-serializing the value first
const getIndent = (jsonString) => {
  const indent = guessJsonIndent(jsonString)
  return typeof indent === 'string' ? indent.length : indent
}

const parseJson = (jsonString) => {
  try {
    return JSON.parse(jsonString)
  } catch (error) {
    throw new TypeError(
      `Invalid JSON string: "${jsonString}"\n${error.message}`,
    )
  }
}

// Unlike object properties and array items, top-level values are truncated
// instead of being omitted.
//  - This ensures the top-level value keeps its type and can be serialized to
//    JSON
// This also allows the input to be any valid JSON string
//  - As opposed to throwing if the top-level value is not an object or array
// Thanks to the minimum `maxSize`, only numbers or strings might be too big
// when used as a top-level value.
const serializeJson = ({ newValue, value, maxSize, indent }) => {
  if (newValue !== undefined) {
    return JSON.stringify(newValue, undefined, indent)
  }

  return typeof value === 'number'
    ? truncateNumber(value, maxSize)
    : truncateString(value, maxSize)
}
