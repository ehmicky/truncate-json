import test from 'ava'
import { each } from 'test-each'
import truncateJson from 'truncate-json'

// eslint-disable-next-line no-restricted-imports
import { MIN_MAX_SIZE } from '../src/options.js'

each(
  [
    { inputString: '12345678', outputString: '1.235e7' },
    { inputString: '123456789', outputString: '1.235e8' },
    { inputString: '123456789e300', outputString: '1.2e308' },
    { inputString: '0.12345678', outputString: '0.12346' },
    { inputString: '0.12345678e-300', outputString: '1e-301' },
    { inputString: '0.000001', outputString: '1e-6' },
    { inputString: '0.00000012345678', outputString: '1.23e-7' },
    { inputString: String(Number.MIN_SAFE_INTEGER), outputString: '-9e15' },
    { inputString: String(Number.MAX_SAFE_INTEGER), outputString: '9.01e15' },
    { inputString: String(-Number.MAX_VALUE), outputString: '-2e308' },
  ],
  ({ title }, { inputString, outputString }) => {
    test(`Truncate top-level numbers | ${title}`, (t) => {
      t.deepEqual(truncateJson(inputString, MIN_MAX_SIZE), {
        truncatedProps: [{ path: [], value: JSON.parse(inputString) }],
        jsonString: outputString,
      })
    })
  },
)

each(['1234567', '0.12345', '0.00001'], ({ title }, inputString) => {
  test(`Does not truncate all top-level numbers | ${title}`, (t) => {
    t.deepEqual(truncateJson(inputString, MIN_MAX_SIZE), {
      jsonString: inputString,
      truncatedProps: [],
    })
  })
})
