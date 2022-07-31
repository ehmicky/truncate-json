import test from 'ava'
import { each } from 'test-each'

import { truncateToOutput } from './helpers/main.js'

each(
  [
    { input: { one: true, prop: 0 }, output: { prop: 0 }, path: ['one'] },
    { input: [true, 0], output: [0], path: [0] },
  ],
  ({ title }, { input, output, path }) => {
    test(`Omitted values are filtered and do not count towards maxSize | ${title}`, (t) => {
      t.deepEqual(truncateToOutput(input, output), {
        output,
        omittedProps: [{ path, value: true }],
      })
    })
  },
)

each(
  [
    {
      input: { one: { two: { three: true } } },
      output: { one: {} },
      path: ['one', 'two'],
      value: { three: true },
    },
    {
      input: { one: { two: true, three: { four: true } } },
      output: { one: { two: true } },
      path: ['one', 'three'],
      value: { four: true },
    },
    { input: [[[true]]], output: [[]], path: [0, 0], value: [true] },
    { input: [[true, [true]]], output: [[true]], path: [0, 1], value: [true] },
  ],
  ({ title }, { input, output, path, value }) => {
    test(`Do not recurse on big fields | ${title}`, (t) => {
      t.deepEqual(truncateToOutput(input, output), {
        output,
        omittedProps: [{ path, value }],
      })
    })
  },
)
