'use strict'
/**
 * 生产时构建
 */

const webpack = require('webpack')
const merge = require('webpack-merge')
// 压缩JS文件(webpack在构建时内置了该插件 如果需要对该插件进行配置 就需要安装)
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const env = require('./env/prod')

const base = require('./webpack.base')

module.exports = merge(base(), {
  plugins: [new webpack.DefinePlugin(env)],
  // 优化
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true, // 多进程打包 提升构建速度
        sourceMap: true
      })
    ]
  },
  devtool: 'source-map'
})
