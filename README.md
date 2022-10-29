[![Codecov](https://img.shields.io/codecov/c/github/ehmicky/truncate-json.svg?label=tested&logo=codecov)](https://codecov.io/gh/ehmicky/truncate-json)
[![TypeScript](https://img.shields.io/badge/-typed-brightgreen?logo=typescript&colorA=gray&logoColor=0096ff)](/types/main.d.ts)
[![Node](https://img.shields.io/node/v/truncate-json.svg?logo=node.js&logoColor=66cc33)](https://www.npmjs.com/package/truncate-json)
[![Twitter](https://img.shields.io/badge/%E2%80%8B-twitter-brightgreen.svg?logo=twitter)](https://twitter.com/intent/follow?screen_name=ehmicky)
[![Medium](https://img.shields.io/badge/%E2%80%8B-medium-brightgreen.svg?logo=medium)](https://medium.com/@ehmicky)

Truncate a JSON string.

# Examples

```js
import truncateJson from 'truncate-json'

// Object properties and array items beyond `maxSize` are omitted.
const maxSize = 15
const jsonString = JSON.stringify({ a: 'one', b: 'two' })
console.log(jsonString)
// '{"a":"one","b":"two"}' (21 bytes)
console.log(truncateJson(jsonString, maxSize).jsonString)
// '{"a":"one"}' (11 bytes)
```

```js
// Works deeply inside objects and arrays
const jsonString = JSON.stringify([
  'one',
  { a: 'two', b: { c: 'three', d: 'four' } },
  'five',
])
console.log(jsonString)
// '["one",{"a":"two","b":{"c":"three","d":"four"}},"five"]' (55 bytes)
const returnValue = truncateJson(jsonString, 40)
console.log(returnValue.jsonString)
// '["one",{"a":"two","b":{"c":"three"}}]' (37 bytes)

// Omitted/truncated properties are returned
console.log(returnValue.truncatedProps)
// [
//   { path: [ 1, 'b', 'd' ], value: 'four' },
//   { path: [ 2 ], value: 'five' }
// ]
const isTruncated = returnValue.truncatedProps.length !== 0
console.log(isTruncated) // true
```

```js
// Indentation is automatically detected and preserved
const jsonString = JSON.stringify({ a: 'one', b: 'two' }, undefined, 2)
console.log(jsonString)
// '{
//   "a": "one",
//   "b": "two"
// }' (30 bytes)
console.log(truncateJson(jsonString, 25).jsonString)
// '{
//   "a": "one"
// }' (16 bytes)
```

```js
// The top-level value can be any JSON type, not only objects or arrays
const jsonString = JSON.stringify('This is an example top-level string')
console.log(truncateJson(jsonString, 25).jsonString)
// '"This is an example t..."' (25 bytes)
```

# Install

```bash
npm install truncate-json
```

This package is an ES module and must be loaded using
[an `import` or `import()` statement](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c),
not `require()`.

# API

## truncateJson(jsonString, maxSize)

`jsonString` `string`\
`maxSize` `number`\
_Return value_: [`object`](#return-value)

Truncates a JSON string to `maxSize` bytes.

Any object property or array item beyond the `maxSize` limit is completely
omitted. Strings are not truncated, except when at the top-level.

### Return value

The return value is an object with the following properties.

#### jsonString

_Type_: `string`

`jsonString` after truncation has been applied.

#### truncatedProps

_Type_: `object[]`

List of properties having been truncated/omitted.

##### truncatedProps[*].path

_Type_: `Array<string | number>`

Property path. This is an array of property keys and/or array indices.

##### truncatedProps[*].value

_Type_: `JsonValue`

Property value.

# Related projects

- [`is-json-value`](https://github.com/ehmicky/is-json-value): Check if a value
  is valid JSON
- [`safe-json-value`](https://github.com/ehmicky/safe-json-value): ⛑️ JSON
  serialization should never fail
- [`guess-json-indent`](https://github.com/ehmicky/guess-json-indent): Guess the
  indentation of a JSON string
- [`string-byte-length`](https://github.com/ehmicky/string-byte-length): Get the
  UTF-8 byte length of a string
- [`string-byte-slice`](https://github.com/ehmicky/string-byte-slice): Like
  `string.slice()` but bytewise

# Support

For any question, _don't hesitate_ to [submit an issue on GitHub](../../issues).

Everyone is welcome regardless of personal background. We enforce a
[Code of conduct](CODE_OF_CONDUCT.md) in order to promote a positive and
inclusive environment.

# Contributing

This project was made with ❤️. The simplest way to give back is by starring and
sharing it online.

If the documentation is unclear or has a typo, please click on the page's `Edit`
button (pencil icon) and suggest a correction.

If you would like to help us fix a bug or add a new feature, please check our
[guidelines](CONTRIBUTING.md). Pull requests are welcome!

<!-- Thanks go to our wonderful contributors: -->

<!-- ALL-CONTRIBUTORS-LIST:START -->
<!-- prettier-ignore -->
<!--
<table><tr><td align="center"><a href="https://twitter.com/ehmicky"><img src="https://avatars2.githubusercontent.com/u/8136211?v=4" width="100px;" alt="ehmicky"/><br /><sub><b>ehmicky</b></sub></a><br /><a href="https://github.com/ehmicky/truncate-json/commits?author=ehmicky" title="Code">💻</a> <a href="#design-ehmicky" title="Design">🎨</a> <a href="#ideas-ehmicky" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/ehmicky/truncate-json/commits?author=ehmicky" title="Documentation">📖</a></td></tr></table>
 -->
<!-- ALL-CONTRIBUTORS-LIST:END -->
