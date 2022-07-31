// Truncate a top-level value.
// Unlike object properties and array items, top-level values are truncated
// instead of being omitted.
//  - This ensures the top-level value keeps its type and can be serialized to
//    JSON
// This also allows the input to be any valid JSON string
//  - As opposed to throwing if the top-level value is not an object or array
// Thanks to the minimum `maxSize`, only numbers or strings might be too big
// when used as a top-level value.
export const truncateTopValue = function (value, maxSize) {
  const valueString = JSON.stringify(value)
  return typeof value === 'number'
    ? truncateNumber(valueString, maxSize)
    : truncateString(valueString, maxSize)
}

const truncateNumber = function (valueString, maxSize) {
  return valueString
}

const truncateString = function (valueString, maxSize) {
  return valueString
}
