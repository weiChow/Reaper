'use strict'
/**
 * Created by weiChow on 2020/06/30.
 * Sagas
 */

import { all } from 'redux-saga/effects'
// global
import { systemReady } from './nameSpace/global'

/**
 * Saga Start
 * @returns {IterableIterator<*>}
 */
function* sagaStart() {
  console.log(`Hello ${environment} Saga, Start!`)
}

export default function* rootSaga() {
  yield all([
    sagaStart(),
    // global
    systemReady()
  ])
}
