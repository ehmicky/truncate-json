import test from 'ava'
import { each } from 'test-each'

import { truncateMinimum } from './helpers/main.js'
import { STRINGS } from './helpers/strings.js'

each(STRINGS, ({ title }, key) => {
  test(`Truncate object properties | ${title}`, (t) => {
    const input = { one: true, [key]: true }
    const output = { one: true }
    t.deepEqual(truncateMinimum(input), [
      { output: input, omittedProps: [] },
      { output, omittedProps: [{ path: [key], value: true }] },
    ])
  })
})
