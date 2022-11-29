/**
 * Any JSON value.
 */
type JSONValue =
  | null
  | boolean
  | number
  | string
  | JSONValue[]
  | { [key: string]: JSONValue }

/**
 * Property having been truncated/omitted.
 */
export interface TruncatedProp {
  /**
   * Property path. This is an array of property keys and/or array indices.
   */
  path: Array<string | number>

  /**
   * Property value.
   */
  value: JSONValue
}

/**
 * Truncates a JSON string to `maxSize` bytes.
 *
 * Any object property or array item beyond the `maxSize` limit is completely
 * omitted. Strings are not truncated, except when at the top-level.
 *
 * @example
 * ```js
 * import truncateJson from 'truncate-json'
 *
 * // Object properties and array items beyond `maxSize` are omitted.
 * const maxSize = 15
 * const jsonString = JSON.stringify({ a: 'one', b: 'two' })
 * console.log(jsonString)
 * // '{"a":"one","b":"two"}' (21 bytes)
 * console.log(truncateJson(jsonString, maxSize).jsonString)
 * // '{"a":"one"}' (11 bytes)
 *
 * // Works deeply inside objects and arrays
 * const jsonString = JSON.stringify([
 *   'one',
 *   { a: 'two', b: { c: 'three', d: 'four' } },
 *   'five',
 * ])
 * console.log(jsonString)
 * // '["one",{"a":"two","b":{"c":"three","d":"four"}},"five"]' (55 bytes)
 * const returnValue = truncateJson(jsonString, 40)
 * console.log(returnValue.jsonString)
 * // '["one",{"a":"two","b":{"c":"three"}}]' (37 bytes)
 *
 * // Omitted/truncated properties are returned
 * console.log(returnValue.truncatedProps)
 * // [
 * //   { path: [ 1, 'b', 'd' ], value: 'four' },
 * //   { path: [ 2 ], value: 'five' }
 * // ]
 * const isTruncated = returnValue.truncatedProps.length !== 0
 * console.log(isTruncated) // true
 *
 * // Indentation is automatically detected and preserved
 * const jsonString = JSON.stringify({ a: 'one', b: 'two' }, undefined, 2)
 * console.log(jsonString)
 * // '{
 * //   "a": "one",
 * //   "b": "two"
 * // }' (30 bytes)
 * console.log(truncateJson(jsonString, 25).jsonString)
 * // '{
 * //   "a": "one"
 * // }' (16 bytes)
 *
 * // The top-level value can be any JSON type, not only objects or arrays
 * const jsonString = JSON.stringify('This is an example top-level string')
 * console.log(truncateJson(jsonString, 25).jsonString)
 * // '"This is an example t..."' (25 bytes)
 * ```
 */
export default function truncateJson(
  jsonString: string,
  maxSize: number,
): {
  jsonString: string
  truncatedProps: TruncatedProp[]
}
