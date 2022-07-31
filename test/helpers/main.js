import truncateJson from 'truncate-json'

// Call main function twice: once with exact right `maxSize` and once with 1
// byte less
export const truncateMinimum = function (input) {
  const maxSize = getJsonLength(input)
  return [truncateToSize(input, maxSize), truncateToSize(input, maxSize - 1)]
}

// Call main function to truncate an `input` towards the size of an `output`
export const truncateToOutput = function (input, output) {
  const maxSize = getJsonLength(output)
  return truncateToSize(input, maxSize)
}

// Call main function to truncate an `input` towards a specific size
export const truncateToSize = function (input, maxSize) {
  const inputString = JSON.stringify(input)
  const { jsonString, truncatedProps } = truncateJson(inputString, maxSize)
  const output = JSON.parse(jsonString)
  return { output, truncatedProps }
}

const getJsonLength = function (value) {
  const jsonString = JSON.stringify(value)
  return textEncoder.encode(jsonString).length
}

const textEncoder = new TextEncoder()
