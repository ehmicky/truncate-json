import stringByteLength from 'string-byte-length'
import truncateJson from 'truncate-json'

// Call main function twice: once with exact right `maxSize` and once with 1
// byte less
export const truncateMinimum = (input, indent) => {
  const maxSize = getJsonLength(input, indent)
  return [
    truncateToSize(input, maxSize, indent),
    truncateToSize(input, maxSize - 1, indent),
  ]
}

// Call main function to truncate an `input` towards the size of an `output`
export const truncateToOutput = (input, output, indent) => {
  const maxSize = getJsonLength(output, indent)
  return truncateToSize(input, maxSize, indent)
}

// Call main function to truncate an `input` towards a specific size
export const truncateToSize = (input, maxSize, indent) => {
  const inputString = JSON.stringify(input, undefined, indent)
  const { jsonString, truncatedProps } = truncateJson(inputString, maxSize)
  const output = JSON.parse(jsonString)
  return { output, truncatedProps }
}

const getJsonLength = (value, indent) => {
  const jsonString = JSON.stringify(value, undefined, indent)
  return stringByteLength(jsonString)
}
