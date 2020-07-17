'use strict'
/**
 * Created by weiChow on 2020/07/13
 * global model
 */

export default {
  nameSpace: 'global',

  state: {
    systemReady: false // 系统初始化完毕
  },

  effects: {
    *setSystemReady({ payload }, { put, call }) {
      yield call(
        () =>
          new Promise(resolve => {
            window.setTimeout(resolve, 3000)
          })
      )
      yield put({
        type: 'global/save',
        payload: {
          systemReady: true
        }
      })
    }
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload }
    }
  }
}
