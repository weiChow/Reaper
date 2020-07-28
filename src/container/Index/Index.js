'use strict'
/**
 * Created by weiChow on 2020/06/30.
 * @author weiChow
 * 首页
 * export default Index;
 */

import React, { useEffect } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import PropTypes from 'prop-types'
import './Index.less'
import { getOrgInfoByOrgCode, getApiMock } from '@/services/global'

function Index(props) {
  useEffect(() => {
    getOrgInfoByOrgCode('510100000000').then(response => {
      console.log(response)
      props.dispatch({
        type: 'global/setSystemReady'
      })
    })
    getApiMock().then(data => {
      console.log(data)
    })
  }, [])

  return (
    <main className="main">
      <div className="universe animate__animated animate__fadeIn" />
      <h1 className="animate__animated animate__fadeIn">welcome Raper Cli ！</h1>
    </main>
  )
}

Index.propTypes = {
  dispatch: PropTypes.func
}

export default compose(connect(), withRouter)(Index)
