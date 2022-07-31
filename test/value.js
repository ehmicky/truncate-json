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
