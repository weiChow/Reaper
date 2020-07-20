/** @format */

'use strict'
/**
 * Created by weiChow on 2020/06/30.
 * @author weiChow
 * 入口路由
 * export default Router;
 */

import asyncComponent from '@/common/tool/asyncComponent' // 异步加载
import systemConfig from '@/config/systemConfig'

const Router = [
  {
    name: '首页',
    path: `${systemConfig.PGIS_SYSCONFIG.system.publicPath || '/'}`,
    exact: true,
    component: asyncComponent(() => import('@/container/Index/Index'))
  }
]

export default Router
