import truncateJson from 'truncate-json'

// Test wrapper around main function
export const truncateMinimum = function (input) {
  const size = JSON.stringify(input).length
  return [truncate(input, size), truncate(input, size - 1)]
}

export const truncate = function (input, maxSize) {
  const inputString = JSON.stringify(input)
  const { jsonString, omittedProps } = truncateJson(inputString, maxSize)
  const output = JSON.parse(jsonString)
  return { output, omittedProps }
}
