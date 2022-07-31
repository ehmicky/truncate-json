import truncateJson from 'truncate-json'

// Call main function twice: once with exact right `maxSize` and once with 1
// byte less
export const truncateMinimum = function (input) {
  const maxSize = JSON.stringify(input).length
  return [truncate(input, maxSize), truncate(input, maxSize - 1)]
}

// Call main function to truncate an `input` towards the size of an `output`
export const truncateToOutput = function (input, output) {
  const maxSize = JSON.stringify(output).length
  return truncate(input, maxSize)
}

const truncate = function (input, maxSize) {
  const inputString = JSON.stringify(input)
  const { jsonString, omittedProps } = truncateJson(inputString, maxSize)
  const output = JSON.parse(jsonString)
  return { output, omittedProps }
}
