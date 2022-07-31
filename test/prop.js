import test from 'ava'
import { each } from 'test-each'
import truncateJson from 'truncate-json'

import { STRINGS } from './helpers/strings.js'

each([...STRINGS], ({ title }, key) => {
  test(`Truncate properties | ${title}`, (t) => {
    const input = { one: true, [key]: true }
    const jsonString = JSON.stringify(input)
    const size = jsonString.length
    t.deepEqual(truncateJson(jsonString, size), {
      jsonString,
      omittedProps: [],
    })
    t.deepEqual(truncateJson(jsonString, size - 1), {
      jsonString: JSON.stringify({ one: true }),
      omittedProps: [{ path: [key], value: true }],
    })
  })
})
