// Validate arguments and options
export const validateOptions = function (maxSize) {
  if (!Number.isInteger(maxSize)) {
    throw new TypeError(`"maxSize" option must be an integer: ${maxSize}`)
  }

  if (maxSize < 0) {
    throw new TypeError(`"maxSize" option must be positive: ${maxSize}`)
  }

  if (maxSize < MIN_MAX_SIZE) {
    throw new TypeError(
      `"maxSize" option must be at least ${MIN_MAX_SIZE}: ${maxSize}`,
    )
  }
}

// JSON size of [] and {}
const MIN_MAX_SIZE = 2
