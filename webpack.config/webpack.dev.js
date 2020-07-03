'use strict'
/**
 * 开发时构建
 */

const webpack = require('webpack')
const path = require('path')
const merge = require('webpack-merge')
const base = require('./webpack.base')
const env = require('./env/dev')

const outputPath = path.resolve(__dirname, '../dist')

module.exports = merge(base(), {
  plugins: [new webpack.DefinePlugin(env)],
  // 开发环境服务器(WDS) 如果使用了webpack-dev-middleware 则webpack不会读取该项配置
  devServer: {
    contentBase: outputPath,
    compress: true, // 一切服务都启用gzip 压缩
    hot: true, // 开启热更新 与HMR配合完全开启启用热更新功能
    open: true, // WDS启动后启动浏览器 (cli: --open)
    port: 8000, // 端口
    https: false // 可开启https
  },
  devtool: 'source-map'
})
