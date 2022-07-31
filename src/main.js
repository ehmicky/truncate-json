import { truncateNumber } from './number.js'
import { validateOptions } from './options.js'
import { truncateString } from './string.js'
import { truncateValue } from './value.js'

// Truncate a JSON string
export default function truncateJson(jsonString, maxSize) {
  validateOptions(jsonString, maxSize)
  const value = parseJson(jsonString)
  const { value: newValue, truncatedProps } = truncateValue({
    value,
    truncatedProps: [],
    path: [],
    size: 0,
    maxSize,
  })
  const newJsonString = serializeJson(newValue, value, maxSize)
  return { jsonString: newJsonString, truncatedProps }
}

const parseJson = function (jsonString) {
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
const serializeJson = function (newValue, value, maxSize) {
  if (newValue !== undefined) {
    return JSON.stringify(newValue)
  }

  return typeof value === 'number'
    ? truncateNumber(value, maxSize)
    : truncateString(value, maxSize)
}
