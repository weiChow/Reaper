/**
 * Created by weiChow on 2019/2/18.
 * 路由入口
 * export default RootRouter;
 *
 * @format
 */

import React from 'react'
import { Switch } from 'react-router'
import { BrowserRouter, HashRouter } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'
import router from './config/router' // 路由
const routes = [...router] // 路由合并
const RouterComponent = () => <Switch>{renderRoutes(routes)}</Switch>
const RootRouter = () =>
  process.env.NODE_ENV === 'dev' ? (
    <HashRouter>
      <RouterComponent />
    </HashRouter>
  ) : (
    <BrowserRouter>
      <RouterComponent />
    </BrowserRouter>
  )
export default RootRouter
