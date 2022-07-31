import test from 'ava'
import { each } from 'test-each'

import { truncate } from './helpers/main.js'
import { STRINGS } from './helpers/strings.js'

each(STRINGS, ({ title }, key) => {
  test(`Truncate object properties | ${title}`, (t) => {
    const input = { one: true, [key]: true }
    const output = { one: true }
    const size = JSON.stringify(input).length
    t.deepEqual(truncate(input, size), {
      output: input,
      omittedProps: [],
    })
    t.deepEqual(truncate(input, size - 1), {
      output,
      omittedProps: [{ path: [key], value: true }],
    })
  })
})
