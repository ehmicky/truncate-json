import truncateJson from 'truncate-json'

// Test wrapper around main function
export const truncate = function (input, maxSize) {
  const inputString = JSON.stringify(input)
  const { jsonString, omittedProps } = truncateJson(inputString, maxSize)
  const output = JSON.parse(jsonString)
  return { output, omittedProps }
}
