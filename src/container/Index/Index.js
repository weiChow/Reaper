'use strict'
/**
 * Created by weiChow on 2020/06/30.
 * @author weiChow
 * 首页
 * export default Index;
 */

import React, { useEffect } from 'react'
import './Index.less'

function Index() {
  console.log('hello, ' + name + '!')
  console.log([1, 2, 3, 4])
  useEffect(() => {
    setTimeout(() => {
      console.log('ready')
    }, 1000)
  }, [])

  return (
    <main className="main">
      <h1 className="animate__animated animate__fadeIn">welcome Raper Cli ！</h1>
    </main>
  )
}

export default Index
