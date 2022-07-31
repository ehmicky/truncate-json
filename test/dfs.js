import test from 'ava'
import { each } from 'test-each'
import truncateJson from 'truncate-json'

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
      const jsonString = JSON.stringify(input)
      const outputString = JSON.stringify(output)
      const maxSize = outputString.length
      t.deepEqual(truncateJson(jsonString, maxSize), {
        jsonString: outputString,
        omittedProps: [{ path, value: true }],
      })
    })
  },
)
