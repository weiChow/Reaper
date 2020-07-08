'use strict'

import { GLOBAL_SYSTEM_READY } from '../../../mutation'
import { take, put } from 'redux-saga/effects'

const nameSpace = 'global'

/**
 * 系统初始化
 * @returns {IterableIterator<<"PUT", PutEffectDescriptor<{payload: *, type: *}>>|<"TAKE", TakeEffectDescriptor>>}
 */
export function* systemReady() {
  const action = yield take(`${nameSpace}/setSystemReady`)
  yield put({
    type: GLOBAL_SYSTEM_READY,
    payload: action.payload
  })
}
