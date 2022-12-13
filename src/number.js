// Truncate a top-level number
export const truncateNumber = (value, maxSize) => {
  const valueString = truncateNumberPrecision(
    value,
    'toPrecision',
    maxSize,
    maxSize,
  )
  return valueString === undefined
    ? truncateNumberPrecision(value, 'toExponential', maxSize, maxSize)
    : valueString
}

// eslint-disable-next-line max-params
const truncateNumberPrecision = (value, methodName, maxSize, size) => {
  const valueString = value[methodName](size)
  const valueStringA = valueString
    .replace(POSITIVE_EXPONENT, '$1')
    .replace(TRIMMED_NUMBER_REGEXP, '$1')

  if (valueStringA.length <= maxSize) {
    return valueStringA
  }

  return size === 1
    ? undefined
    : truncateNumberPrecision(value, methodName, maxSize, size - 1)
}

// + in exponent in optional in JSON
const POSITIVE_EXPONENT = /(e)\+/iu
// Trim trailing decimal zeros
const TRIMMED_NUMBER_REGEXP = /\.?0*($|e)/iu
