import test from 'ava'
import { each } from 'test-each'
import truncateJson from 'truncate-json'

const bigStringMaxSize = 1e2
const stringSize = 1e3
const bigString = 'a'.repeat(stringSize)

each(
  [
    {
      input: { one: bigString, prop: true },
      output: { prop: true },
      path: ['one'],
    },
    { input: [bigString, true], output: [true], path: [0] },
  ],
  ({ title }, { input, output, path }) => {
    test(`Omitted values are filtered and do not count towards maxSize | ${title}`, (t) => {
      const inputString = JSON.stringify(input)
      const outputString = JSON.stringify(output)
      t.deepEqual(truncateJson(inputString, bigStringMaxSize), {
        jsonString: outputString,
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
    { input: [[[true]]], output: [[]], path: [0, 0], value: [true] },
    { input: [[true, [true]]], output: [[true]], path: [0, 1], value: [true] },
  ],
  ({ title }, { input, output, path, value }) => {
    test(`Do not recurse on big fields | ${title}`, (t) => {
      const inputString = JSON.stringify(input)
      const outputString = JSON.stringify(output)
      const maxSize = outputString.length
      t.deepEqual(truncateJson(inputString, maxSize), {
        jsonString: outputString,
        omittedProps: [{ path, value }],
      })
    })
  },
)
