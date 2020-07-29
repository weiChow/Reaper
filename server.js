'use strict'

const path = require('path')
const os = require('os')
const open = require('open')
const express = require('express')
const webpack = require('webpack')
const apiMocker = require('mocker-api')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')

const app = express()
const config = require('./webpack.config/webpack.dev.js')
const compiler = webpack(config)
compiler.apply(new webpack.ProgressPlugin()) // 进度显示

const port = 9999 // 开发环境端口
const publicPath = '/' // 系统相对服务路径 默认为空

app.use(
  webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
    noInfo: true,
    stats: {
      colors: true,
      chunks: false
    } // 统计信息
  })
)

// app.use(express.static(path.join(__dirname, './dist'))) // 设置静态访问文件路径

app.use(
  webpackHotMiddleware(compiler, {
    log: console.log,
    path: '/__webpack_hmr',
    heartbeat: 10 * 1000 // 心跳检测(一般为timeout一半)
  })
)

apiMocker(app, require.resolve('./src/mock/index'))

app.get('*', (req, res, next) => {
  const filename = path.join(__dirname, './dist', 'index.html')
  compiler.outputFileSystem.readFile(filename, (err, result) => {
    if (err) {
      return next(err)
    }
    res.set('content-type', 'text/html')
    res.send(result)
    res.end()
  })
})

app.listen(port, function () {
  const address = [`http://localhost:${port}${publicPath}`, `http://${getIPAddress()}:${port}${publicPath}`]
  console.log('app listening on the following address:')
  console.log(`${address[0]}!`)
  console.log(`${address[1]}!`)
  console.log('The Web browser will open automatically after 5 seconds . . .')
  console.log('Please wait while building . . .')
  setTimeout(() => {
    ;(async () => {
      await open(address[1], { wait: true })
    })()
  }, 5000)
})

/**
 * 获取本机IP
 * @returns {string}
 */
function getIPAddress() {
  const interfaces = os.networkInterfaces()
  for (const devName in interfaces) {
    const iface = interfaces[devName]
    for (let i = 0; i < iface.length; i++) {
      const alias = iface[i]
      if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
        return alias.address
      }
    }
  }
}
