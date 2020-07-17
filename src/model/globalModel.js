'use strict'

export default {
  namespace: 'global',

  state: {
    systemReady: false // 系统初始化完毕
  },

  effects: {
    *setSystemReady({ payload }, { put }) {
      yield put({
        type: 'global/save',
        payload
      })
    }
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload }
    }
  }
}
