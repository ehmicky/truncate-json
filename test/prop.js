import test from 'ava'
import { each } from 'test-each'

import { INDENTS } from './helpers/indent.js'
import { truncateMinimum } from './helpers/main.js'
import { STRINGS } from './helpers/strings.js'

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
