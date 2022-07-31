import { expectType, expectAssignable, expectError } from 'tsd'

import truncateJson, { Options } from './main.js'

expectType<string>(truncateJson('{}', 2))
expectError(truncateJson({}, 2))
expectError(truncateJson('{}', '2'))

truncateJson('{}', 2, {})
expectAssignable<Options>({})
