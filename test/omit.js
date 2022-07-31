import test from 'ava'
import { each } from 'test-each'
import truncateJson from 'truncate-json'

const maxSize = 1e2
const stringSize = 1e3
const bigString = 'a'.repeat(stringSize)

each(
  [
    {
      input: { one: bigString, prop: true },
      output: { prop: true },
      key: 'one',
    },
    { input: [bigString, true], output: [true], key: 0 },
  ],
  ({ title }, { input, output, key }) => {
    test(`Omitted values do not count towards maxSize | ${title}`, (t) => {
      const jsonString = JSON.stringify(input)
      t.deepEqual(truncateJson(jsonString, maxSize), {
        jsonString: JSON.stringify(output),
        omittedProps: [{ path: [key], value: bigString }],
      })
    })
  },
)
