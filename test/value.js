import test from 'ava'
import { each } from 'test-each'

import { truncateMinimum, truncateToOutput } from './helpers/main.js'
import { STRINGS } from './helpers/strings.js'

each(
  [
    {},
    [],
    true,
    false,
    // eslint-disable-next-line unicorn/no-null
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
  ({ title }, value) => {
    test(`Truncate values | ${title}`, (t) => {
      const input = { value }
      const output = {}
      t.deepEqual(truncateMinimum(input), [
        { output: input, omittedProps: [] },
        { output, omittedProps: [{ path: ['value'], value }] },
      ])
    })
  },
)

each(
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
  ({ title }, { input, output, path }) => {
    test(`Truncates in a depth-first manner | ${title}`, (t) => {
      t.deepEqual(truncateToOutput(input, output), {
        output,
        omittedProps: [{ path, value: 0 }],
      })
    })
  },
)
