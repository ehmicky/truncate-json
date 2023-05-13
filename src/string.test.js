import test from 'ava'
import { each } from 'test-each'
import truncateJson from 'truncate-json'

import { MIN_MAX_SIZE } from './options.js'

each(
  [
    { inputString: '"123456"', outputString: '"12..."' },
    { inputString: '"\u5555123"', outputString: '"..."' },
    { inputString: '"\u55551234"', outputString: '"\u5555..."', shift: 1 },
    { inputString: '"1\\n234"', outputString: '"1..."' },
    { inputString: '"1\\n2345"', outputString: '"1\\n..."', shift: 1 },
    { inputString: '"\\u0000"', outputString: '"..."' },
    { inputString: '"\\u00001"', outputString: '"..."', shift: 1 },
    { inputString: '"\\u000012"', outputString: '"..."', shift: 2 },
    { inputString: '"\\u0000123"', outputString: '"..."', shift: 3 },
    { inputString: '"\\u00001234"', outputString: '"\\u0000..."', shift: 4 },
    { inputString: '"\\u000012345"', outputString: '"\\u00001..."', shift: 5 },
  ],
  ({ title }, { inputString, outputString, shift = 0 }) => {
    test(`Truncate top-level strings | ${title}`, (t) => {
      t.deepEqual(truncateJson(inputString, MIN_MAX_SIZE + shift), {
        jsonString: outputString,
        truncatedProps: [{ path: [], value: JSON.parse(inputString) }],
      })
    })
  },
)

each(
  [
    { inputString: '"12345"' },
    { inputString: '"\u555512"' },
    { inputString: '"1\\n23"' },
    { inputString: '"\\u0000"', shift: 1 },
  ],
  ({ title }, { inputString, shift = 0 }) => {
    test(`Does not truncate all top-level strings | ${title}`, (t) => {
      t.deepEqual(truncateJson(inputString, MIN_MAX_SIZE + shift), {
        jsonString: inputString,
        truncatedProps: [],
      })
    })
  },
)
