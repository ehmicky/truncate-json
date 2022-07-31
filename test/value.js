import test from 'ava'
import { each } from 'test-each'

import { truncate } from './helpers/main.js'
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
      const size = JSON.stringify(input).length
      t.deepEqual(truncate(input, size), {
        output: input,
        omittedProps: [],
      })
      t.deepEqual(truncate(input, size - 1), {
        output,
        omittedProps: [{ path: ['value'], value }],
      })
    })
  },
)

each(
  [
    {
      input: { one: { two: { three: true, four: true } } },
      output: { one: { two: { three: true } } },
      path: ['one', 'two', 'four'],
    },
    {
      input: { one: { four: true, two: { three: true, four: true } } },
      output: { one: { four: true, two: { three: true } } },
      path: ['one', 'two', 'four'],
    },
  ],
  ({ title }, { input, output, path }) => {
    test(`Truncates in a depth-first manner | ${title}`, (t) => {
      const maxSize = JSON.stringify(output).length
      t.deepEqual(truncate(input, maxSize), {
        output,
        omittedProps: [{ path, value: true }],
      })
    })
  },
)
