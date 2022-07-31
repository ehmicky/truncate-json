// Validate arguments and options
export const validateOptions = function (jsonString, maxSize) {
  if (typeof jsonString !== 'string') {
    throw new TypeError(`Input must be a JSON string: ${jsonString}`)
  }

  validateMaxSize(maxSize)
}

const validateMaxSize = function (maxSize) {
  checkMaxSizeType(maxSize)

  if (maxSize < 0) {
    throw new TypeError(`"maxSize" argument must be positive: ${maxSize}`)
  }

  if (maxSize < MIN_MAX_SIZE) {
    throw new TypeError(
      `"maxSize" argument must be at least ${MIN_MAX_SIZE}: ${maxSize}`,
    )
  }
}

const checkMaxSizeType = function (maxSize) {
  if (maxSize === undefined) {
    throw new TypeError('"maxSize" argument must be defined')
  }

  if (!Number.isInteger(maxSize)) {
    throw new TypeError(`"maxSize" argument must be an integer: ${maxSize}`)
  }
}

// Allows any top-level value:
//  - null, true or false
//  - {} or []
//  - "a..." or 1e-300 (after maximum truncation)
const MIN_MAX_SIZE = 6
