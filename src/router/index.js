'use strict'
/**
 * Created by weiChow on 2020//06/30.
 * 路由入口
 * export default RootRouter;
 */

import React from 'react'
import { Switch } from 'react-router'
import { BrowserRouter } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'
import router from './config/router' // 路由
const routes = [...router] // 路由合并
const RouterComponent = () => <Switch>{renderRoutes(routes)}</Switch>
const RootRouter = () => (
  <BrowserRouter>
    <RouterComponent />
  </BrowserRouter>
)
export default RootRouter
