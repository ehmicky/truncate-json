import stringByteSlice from 'string-byte-slice'

// Truncate a top-level string
export const truncateString = (value, maxSize) => {
  const jsonString = JSON.stringify(value)
  const truncatedString = removeQuotes(jsonString)
  const truncatedStringA = stringByteSlice(
    truncatedString,
    0,
    maxSize - ELLIPSIS.length - QUOTE.length * 2,
  )
  const truncatedStringB = fixUnicodeSequenceEnd(truncatedStringA)
  const truncatedStringC = `${truncatedStringB}${ELLIPSIS}`
  return addQuotes(truncatedStringC)
}

const fixUnicodeSequenceEnd = (truncatedString) =>
  truncatedString.replace(INVALID_JSON_END, '')

// The truncation might happen in the middle of a backslash sequence, which is
// invalid JSON. We trim it.
const INVALID_JSON_END = /(\\|\\u[0-9a-fA-F]{0,3})$/u

const removeQuotes = (jsonString) =>
  jsonString.slice(QUOTE.length, -QUOTE.length)

const addQuotes = (truncatedString) => `${QUOTE}${truncatedString}${QUOTE}`

const QUOTE = '"'
const ELLIPSIS = '...'
