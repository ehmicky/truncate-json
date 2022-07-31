import test from 'ava'
import { each } from 'test-each'

import { truncateToOutput } from './helpers/main.js'

const bigStringLength = 1e3
const bigString = 'a'.repeat(bigStringLength)
each(
  [
    {
      input: { one: bigString, prop: false },
      output: { prop: false },
      path: ['one'],
    },
    { input: [bigString, false], output: [false], path: [0] },
  ],
  ({ title }, { input, output, path }) => {
    test(`Omitted values are filtered and do not count towards maxSize | ${title}`, (t) => {
      t.deepEqual(truncateToOutput(input, output), {
        output,
        omittedProps: [{ path, value: bigString }],
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
    {
      input: { one: [[[true]]] },
      output: { one: [[]] },
      path: ['one', 0, 0],
      value: [true],
    },
    {
      input: { one: [[true, [true]]] },
      output: { one: [[true]] },
      path: ['one', 0, 1],
      value: [true],
    },
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
