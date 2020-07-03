'use strict'

import { GLOBAL_SYSTEM_READY } from '../../mutation'
import { combineReducers } from 'redux'

/**
 * 系统初始化
 * @param state
 * @param action
 * @returns {boolean}
 */
const systemReady = (state = false, action) => {
  switch (action.type) {
    case GLOBAL_SYSTEM_READY:
      return action.payload
    default:
      return state
  }
}

export default combineReducers({
  systemReady
})
