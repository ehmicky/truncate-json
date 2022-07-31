import { validateOptions } from './options.js'
import { truncateValue } from './value.js'

// Truncate a JSON string
export default function truncateJson(jsonString, maxSize) {
  validateOptions(maxSize)
  const value = parseJson(jsonString)
  const { value: valueA, omittedProps } = truncateValue({
    value,
    omittedProps: [],
    path: [],
    size: 0,
    maxSize,
  })
  const jsonStringA = JSON.stringify(valueA)
  return { jsonString: jsonStringA, omittedProps }
}

const parseJson = function (jsonString) {
  if (typeof jsonString !== 'string') {
    throw new TypeError(`Input must be a JSON string: ${jsonString}`)
  }

  try {
    return JSON.parse(jsonString)
  } catch (error) {
    throw new TypeError(
      `Invalid JSON string: "${jsonString}"\n${error.message}`,
    )
  }
}
