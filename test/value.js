import test from 'ava'
import { each } from 'test-each'
import truncateJson from 'truncate-json'

const strings = [
  'test',
  '',
  // Backslash sequences
  '\n',
  '\0',
  // UTF-8 character
  '𝌆',
  // Valid UTF-8 sequences
  '\uD834\uDF06',
  // Invalid UTF-8 sequences
  '\uDF06\uD834',
  '\uDEAD',
]

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
    ...strings,
  ],
  ({ title }, value) => {
    test(`Truncate values | ${title}`, (t) => {
      const jsonString = JSON.stringify(value)
      const size = jsonString.length
      t.deepEqual(truncateJson(jsonString, size), {
        jsonString,
        omittedProps: [],
      })
      t.deepEqual(truncateJson(jsonString, size - 1), {
        jsonString: undefined,
        omittedProps: [{ path: [], value }],
      })
    })
  },
)

each([...strings], ({ title }, key) => {
  test(`Truncate properties | ${title}`, (t) => {
    const input = { one: true, [key]: true }
    const jsonString = JSON.stringify(input)
    const size = jsonString.length
    t.deepEqual(truncateJson(jsonString, size), {
      jsonString,
      omittedProps: [],
    })
    t.deepEqual(truncateJson(jsonString, size - 1), {
      jsonString: JSON.stringify({ one: true }),
      omittedProps: [{ path: [key], value: true }],
    })
  })
})
