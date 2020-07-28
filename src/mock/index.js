'use strict'
/**
 * Created by weiChow on 2020/07/28
 * mock
 */

const Mock = require('mockjs')

const data = Mock.mock({
  'data|3': [
    {
      'id|+1': 0,
      goodsName: '@ctitle(3, 5)',
      'goodsPrice|+1': 100,
      address: '@county(true)',
      tel: /^1(3|5|7|8|9)\d{9}$/,
      goodsImg: "@image('200x100', '#894FC4', '#FFF', 'alley')",
      date: '@date("yyyy-MM-dd M:dd:d")', // 时间
      email: '@email()', // 邮箱
      'a|3-5': 'a',
      'b|3': 'b',
      'c|+2': 0,
      'd|10-20.2-5': 2,
      'e|1-10.3': 1,
      'f|1.3': 1,
      'g|1-2': true,
      'h|2': {
        a: 1,
        b: 2,
        c: 3
      },
      'i|+1': [1, 2, 3, 4, 5, 6, 7, 8, 9, 0],
      'j|1': [1, 2, 3, 4, 5, 6, 7, 8, 9, 0],
      'k|2-4': [1, 2, 3, 4, 5, 6, 7, 8, 9, 0],
      l: '@zip()'
    }
  ]
})

Mock.mock('/api/global', 'get', function (req, res) {
  return data
})

module.exports = global
