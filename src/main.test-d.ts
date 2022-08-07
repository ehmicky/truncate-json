import { expectType, expectError } from 'tsd'

import truncateJson from './main.js'

expectType<string>(truncateJson('{}', 2))
expectError(truncateJson({}))
expectError(truncateJson({}, 2))
expectError(truncateJson('{}', '2'))
