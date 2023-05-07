import test from 'ava'
import { each } from 'test-each'
import truncateJson from 'truncate-json'

import { MIN_MAX_SIZE } from './options.js'


// eslint-disable-next-line no-magic-numbers
each([undefined, '2', 2.5, -2, 0, 5], ({ title }, maxSize) => {
  test(`Validates maxSize | ${title}`, (t) => {
    t.throws(truncateJson.bind(undefined, JSON.stringify({}), maxSize), {
      message: /maxSize/u,
    })
  })
})

each([undefined, {}, 'a'], ({ title }, jsonString) => {
  test(`Validates jsonString | ${title}`, (t) => {
    t.throws(truncateJson.bind(undefined, jsonString, MIN_MAX_SIZE), {
      message: /JSON string/u,
    })
  })
})
