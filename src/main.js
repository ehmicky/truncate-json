import { truncateValue } from './value.js'

// Truncate a JSON string
export default function truncateJson(jsonString, maxSize) {
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

// const maxSize = 19
// const value = { a: 1, b: 2, c: { d: 3, e: 4 } }
// const valueString = JSON.stringify(value)
// const size = valueString.length
// const { jsonString: truncatedValueString, omittedProps } = truncateJson(
//   valueString,
//   maxSize,
// )
// const realTruncatedSize = truncatedValueString.length
// console.log(maxSize)
// console.log(valueString, size)
// console.log(truncatedValueString, realTruncatedSize)
// console.log(omittedProps)
