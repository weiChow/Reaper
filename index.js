'use strict'

/**
 * Created by weiChow on 2020/06/30.
 * React、ReactDOM、RootRouter、Redux
 */

import React from 'react'
import ReactDOM from 'react-dom'
import RootRouter from '@/router/index' // 路由入口
// devtools
import { composeWithDevTools } from 'redux-devtools-extension'
// Redux
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import reducers from '@/store/reducer/rootReducer'
import createSagaMiddleware from 'redux-saga'
// 引入saga文件
import rootSaga from '@/store/middleware/saga/rootSaga'
import 'animate.css' // 动画效果
import '@/main.less' // 主框架样式
// 国际化(中文)
import { ConfigProvider } from 'antd'
import zhCN from 'antd/es/locale/zh_CN'

if (module.hot) {
  module.hot.accept()
}

const sagaMiddleware = createSagaMiddleware()

// 创建store
const store = createStore(reducers, composeWithDevTools(applyMiddleware(sagaMiddleware)))

// 启动saga
sagaMiddleware.run(rootSaga)

const rootContainer = (
  <Provider {...{ store }}>
    <ConfigProvider locale={zhCN}>
      <RootRouter />
    </ConfigProvider>
  </Provider>
)

ReactDOM.render(rootContainer, document.getElementById('root'))
