import { expectType, expectAssignable } from 'tsd'

import truncateJson, { Options } from './main.js'

expectType<object>(truncateJson(true))

truncateJson(true, {})
expectAssignable<Options>({})
