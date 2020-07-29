'use strict'
/**
 * Created by weiChow on 2020/07/29
 * mock proxy
 */

const mockProxy = [require('./global.mock')]

function getMockProxy() {
  let _proxy = {}
  for (const item of mockProxy.values()) {
    _proxy = Object.assign({}, _proxy, item)
  }
  return _proxy
}

const proxy = {
  ...getMockProxy()
}

module.exports = proxy
