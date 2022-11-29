import {
  expectType,
  expectError,
  expectAssignable,
  expectNotAssignable,
} from 'tsd'

import truncateJson, { TruncatedProp } from 'truncate-json'

const { jsonString, truncatedProps } = truncateJson('{}', 2)
expectError(truncateJson({}))
expectError(truncateJson({}, 2))
expectError(truncateJson('{}', '2'))

expectType<string>(jsonString)

const truncatedProp = truncatedProps[0]!
expectType<TruncatedProp>(truncatedProp)

expectAssignable<TruncatedProp['path']>([])
expectAssignable<TruncatedProp['path']>(['a'])
expectAssignable<TruncatedProp['path']>([0])
expectAssignable<TruncatedProp['path']>([0, 'a'])
expectNotAssignable<TruncatedProp['path']>([Symbol()])
expectNotAssignable<TruncatedProp['path']>(undefined)

expectAssignable<TruncatedProp['value']>(null)
expectAssignable<TruncatedProp['value']>(true)
expectAssignable<TruncatedProp['value']>(0)
expectAssignable<TruncatedProp['value']>('')
expectAssignable<TruncatedProp['value']>([])
expectAssignable<TruncatedProp['value']>({})
expectAssignable<TruncatedProp['value']>([true])
expectAssignable<TruncatedProp['value']>([[true]])
expectAssignable<TruncatedProp['value']>({ key: true })
expectAssignable<TruncatedProp['value']>({ key: { key: true } })
expectNotAssignable<TruncatedProp['value']>(undefined)
expectNotAssignable<TruncatedProp['value']>(0n)
expectNotAssignable<TruncatedProp['value']>([0n])
expectNotAssignable<TruncatedProp['value']>([[0n]])
expectNotAssignable<TruncatedProp['value']>({ key: 0n })
expectNotAssignable<TruncatedProp['value']>({ key: { key: 0n } })
