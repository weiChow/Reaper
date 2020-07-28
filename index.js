'use strict'
/**
 * Created by weiChow on 2020/06/30
 * React、ReactDOM、RootRouter、Redux
 */

import React from 'react'
import ReactDOM from 'react-dom'
import RootRouter from '@/router/index' // 路由入口
import { Provider } from 'react-redux'
import 'animate.css' // 动画效果
import '@/style/main.less' // 主框架样式
import { ConfigProvider } from 'antd'
import zhCN from 'antd/es/locale/zh_CN' // 国际化(中文)
import registerStore from '@/store/registerStore'
import systemConfig from '@/config/systemConfig'

if (environment === 'dev') {
  require('@/mock/index')
}

if (module.hot) {
  module.hot.accept()
}

// 创建store
const context = require.context('@/model', true, /\.js$/)
const store = registerStore()
  .useModel(context.keys().map(key => context(key).default))
  .run()

// 系统名
document.title = systemConfig.PGIS_SYSCONFIG.system.title

const rootContainer = (
  <Provider {...{ store }}>
    <ConfigProvider locale={zhCN}>
      <RootRouter />
    </ConfigProvider>
  </Provider>
)

ReactDOM.render(rootContainer, document.getElementById('root'))
