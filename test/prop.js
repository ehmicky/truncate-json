import test from 'ava'
import { each } from 'test-each'
import truncateJson from 'truncate-json'

import { STRINGS } from './helpers/strings.js'

each(STRINGS, ({ title }, key) => {
  test(`Truncate object properties | ${title}`, (t) => {
    const input = { one: true, [key]: true }
    const inputString = JSON.stringify(input)
    const size = inputString.length
    t.deepEqual(truncateJson(inputString, size), {
      jsonString: inputString,
      omittedProps: [],
    })
    t.deepEqual(truncateJson(inputString, size - 1), {
      jsonString: JSON.stringify({ one: true }),
      omittedProps: [{ path: [key], value: true }],
    })
  })
})
