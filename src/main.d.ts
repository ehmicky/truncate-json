type JSONValue =
  | null
  | boolean
  | number
  | string
  | JSONValue[]
  | { [key: string]: JSONValue }

/**
 *
 */
export interface TruncatedProp {
  path: Array<string | number>
  value: JSONValue
}

/**
 *
 * @example
 * ```js
 * ```
 */
export default function truncateJson(
  jsonString: string,
  maxSize: number,
): {
  jsonString: string
  truncatedProps: TruncatedProp[]
}
