import test from 'ava'
import { each } from 'test-each'

import { INDENTS } from './helpers/indent.test.js'
import { truncateMinimum } from './helpers/main.test.js'
import { STRINGS } from './helpers/strings.test.js'

each(INDENTS, STRINGS, ({ title }, indent, key) => {
  test(`Truncate object properties | ${title}`, (t) => {
    const input = { one: true, [key]: true }
    const output = { one: true }
    t.deepEqual(truncateMinimum(input, indent), [
      { output: input, truncatedProps: [] },
      { output, truncatedProps: [{ path: [key], value: true }] },
    ])
  })
})
