import test from 'ava'
import { each } from 'test-each'

import { INDENTS } from './helpers/indent.test.js'
import {
  truncateMinimum,
  truncateToOutput,
  truncateToSize,
} from './helpers/main.test.js'
import { STRINGS } from './helpers/strings.test.js'
// eslint-disable-next-line no-restricted-imports
import { MIN_MAX_SIZE } from './options.js'

each(
  INDENTS,
  [
    {},
    [],
    true,
    false,
    null,
    0,
    // eslint-disable-next-line no-magic-numbers
    0.1,
    -1,
    // eslint-disable-next-line no-magic-numbers
    1e60,
    // eslint-disable-next-line no-magic-numbers
    1e-60,
    ...STRINGS,
  ],
  ({ title }, indent, value) => {
    test(`Truncate values | ${title}`, (t) => {
      const input = { value }
      const output = {}
      t.deepEqual(truncateMinimum(input, indent), [
        { output: input, truncatedProps: [] },
        { output, truncatedProps: [{ path: ['value'], value }] },
      ])
    })
  },
)

each(
  [{}, [], true, false, null, 0, -Number.MIN_VALUE, ''],
  ({ title }, input) => {
    test(`Some top-level values are never truncated | ${title}`, (t) => {
      t.deepEqual(truncateToSize(input, MIN_MAX_SIZE), {
        output: input,
        truncatedProps: [],
      })
    })
  },
)

each(
  INDENTS,
  [
    {
      input: { one: { two: { three: true, four: 0 } } },
      output: { one: { two: { three: true } } },
      path: ['one', 'two', 'four'],
    },
    {
      input: { one: { four: true, two: { three: true, four: 0 } } },
      output: { one: { four: true, two: { three: true } } },
      path: ['one', 'two', 'four'],
    },
  ],
  ({ title }, indent, { input, output, path }) => {
    test(`Truncates in a depth-first manner | ${title}`, (t) => {
      t.deepEqual(truncateToOutput(input, output, indent), {
        output,
        truncatedProps: [{ path, value: 0 }],
      })
    })
  },
)
