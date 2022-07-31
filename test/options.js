import test from 'ava'
import { each } from 'test-each'
import truncateJson from 'truncate-json'

// eslint-disable-next-line no-magic-numbers
each([undefined, '2', 2.5, -2, 0, 1], ({ title }, maxSize) => {
  test(`Validates maxSize | ${title}`, (t) => {
    t.throws(truncateJson.bind(undefined, '{}', maxSize))
  })
})

each([undefined, {}, 'a'], ({ title }, jsonString) => {
  test(`Validates jsonString | ${title}`, (t) => {
    t.throws(truncateJson.bind(undefined, jsonString, 2))
  })
})
