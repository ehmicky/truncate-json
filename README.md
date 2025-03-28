[![Node](https://img.shields.io/badge/-Node.js-808080?logo=node.js&colorA=404040&logoColor=66cc33)](https://www.npmjs.com/package/truncate-json)
[![Browsers](https://img.shields.io/badge/-Browsers-808080?logo=firefox&colorA=404040)](https://unpkg.com/truncate-json?module)
[![TypeScript](https://img.shields.io/badge/-Typed-808080?logo=typescript&colorA=404040&logoColor=0096ff)](/src/main.d.ts)
[![Codecov](https://img.shields.io/badge/-Tested%20100%25-808080?logo=codecov&colorA=404040)](https://codecov.io/gh/ehmicky/truncate-json)
[![Minified size](https://img.shields.io/bundlephobia/minzip/truncate-json?label&colorA=404040&colorB=808080&logo=webpack)](https://bundlephobia.com/package/truncate-json)
[![Mastodon](https://img.shields.io/badge/-Mastodon-808080.svg?logo=mastodon&colorA=404040&logoColor=9590F9)](https://fosstodon.org/@ehmicky)
[![Medium](https://img.shields.io/badge/-Medium-808080.svg?logo=medium&colorA=404040)](https://medium.com/@ehmicky)

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

This package works in both Node.js >=18.18.0 and
[browsers](https://raw.githubusercontent.com/ehmicky/dev-tasks/main/src/browserslist).

This is an ES module. It must be loaded using
[an `import` or `import()` statement](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c),
not `require()`. If TypeScript is used, it must be configured to
[output ES modules](https://www.typescriptlang.org/docs/handbook/esm-node.html),
not CommonJS.

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
<table><tr><td align="center"><a href="https://fosstodon.org/@ehmicky"><img src="https://avatars2.githubusercontent.com/u/8136211?v=4" width="100px;" alt="ehmicky"/><br /><sub><b>ehmicky</b></sub></a><br /><a href="https://github.com/ehmicky/truncate-json/commits?author=ehmicky" title="Code">💻</a> <a href="#design-ehmicky" title="Design">🎨</a> <a href="#ideas-ehmicky" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/ehmicky/truncate-json/commits?author=ehmicky" title="Documentation">📖</a></td></tr></table>
 -->
<!-- ALL-CONTRIBUTORS-LIST:END -->
