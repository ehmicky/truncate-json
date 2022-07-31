import { validateOptions } from './options.js'
import { truncateTopValue } from './top.js'
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

const serializeJson = function (newValue, value, maxSize) {
  return newValue === undefined
    ? truncateTopValue(value, maxSize)
    : JSON.stringify(newValue)
}
