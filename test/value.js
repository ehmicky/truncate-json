import test from 'ava'
import { each } from 'test-each'
import truncateJson from 'truncate-json'

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
      const inputString = JSON.stringify({ value })
      const outputString = JSON.stringify({})
      const size = inputString.length
      t.deepEqual(truncateJson(inputString, size), {
        jsonString: inputString,
        omittedProps: [],
      })
      t.deepEqual(truncateJson(inputString, size - 1), {
        jsonString: outputString,
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
      const inputString = JSON.stringify(input)
      const outputString = JSON.stringify(output)
      const maxSize = outputString.length
      t.deepEqual(truncateJson(inputString, maxSize), {
        jsonString: outputString,
        omittedProps: [{ path, value: true }],
      })
    })
  },
)
