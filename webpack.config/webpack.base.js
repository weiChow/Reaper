'use strict'
/**
 * Created by weiChow on 2020/06/30
 * webpack基础配置
 */

const path = require('path')
const rules = require('./common/Rules')
const optimization = require('./common/optimization')
const plugins = require('./common/plugins')

// 简化了HTML文件的创建，以便为你的webpack包提供服务
const HtmlWebpackPlugin = require('html-webpack-plugin')

const publicPath = '' // 系统相对服务路径 默认为空

module.exports = () => {
  return {
    mode: process.env.NODE_ENV === 'dev' ? 'development' : 'production', // 配置webpack构建模式(development production)
    entry: [
      'react-hot-loader/patch',
      'webpack-hot-middleware/client?path=/__webpack_hmr&reload=true&timeout=20000',
      path.resolve(__dirname, '../index.js')
    ], // 入口
    output: {
      path: path.resolve(__dirname, '../dist'),
      filename: './static/js/[name]_[hash:16].js',
      chunkFilename: './static/js/chunk/chunk-[name]-[id].[chunkhash:8].bundle.js',
      publicPath: publicPath || '/'
    }, // 输出构建
    // module 关于模块配置
    module: {
      rules: rules() // rules 模块规则（配置 loader、解析器等选项）
    },
    plugins: plugins().concat([
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, '../index.ejs'),
        filename: 'index.html',
        chunks: ['main', 'vendor', 'commons'],
        inject: true,
        minify: false,
        chunksSortMode: 'none', // 如果使用webpack4将该配置项设置为'none'
        title: 'Reaper',
        systemConfig: `${publicPath ? `${publicPath}/` : '/'}config/systemConfig.js` // 系统配置文件
      })
    ]),
    optimization: optimization(),
    // 解析
    resolve: {
      extensions: ['.wasm', '.mjs', '.ts', '.tsx', '.js', '.json'], // 自动解析确定的扩展
      mainFiles: ['index', 'module'],
      alias: {
        '@': path.join(__dirname, '..', 'src'), // @映射到src目录
        'react-dom': '@hot-loader/react-dom', // 该包支持对React hook热更新
        static: path.join(__dirname, '..', 'src/static') // 指向静态资源目录
      }
    }
  }
}
