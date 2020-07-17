'use strict'
/**
 * Created by weiChow on 2020/06/30
 * plugins
 */

const path = require('path')
const webpack = require('webpack')
const CopyPlugin = require('copy-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin') // 每次构建前清理webpack配置的output目录，这样只会生成用到的文件
const MiniCssExtractPlugin = require('mini-css-extract-plugin') // 将CSS提取到单独的文件中 它为每个包含CSS的JS文件创建一个CSS文件 它支持CSS和SourceMap的按需加载
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin') // 压缩CSS文件
const CompressionPlugin = require('compression-webpack-plugin') // 压缩资源
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer') // 可视化构建分析

module.exports = () => {
  const modePlugins = [
    new CopyPlugin({
      patterns: [
        {
          from: path.join(__dirname, '../../src/static/**/*'), // static resource directory
          to: './static',
          cacheTransform: true,
          noErrorOnMissing: true // Doesn't generate an error on missing file(s).
        },
        {
          from: path.join(__dirname, `../../src/config/system.${process.env.NODE_ENV}.config.js`),
          to: './config/systemConfig.js'
        }
      ],
      options: {
        concurrency: 100 // limits the number of simultaneous requests to fs
      }
    }),
    new CompressionPlugin({
      filename: '[path].gz[query]', // 目标资源名称。[file] 会被替换成原资源。[path] 会被替换成原资源路径，[query] 替换成原查询字符串
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(js|css)$' // 压缩 js css
      ),
      threshold: 10240, // 只处理比这个值大的资源。按字节计算
      minRatio: 0.8 // 只有压缩率比这个值小的资源才会被处理
    })
  ]
  if (process.env.NODE_ENV === 'dev') {
    modePlugins.push(
      new webpack.HotModuleReplacementPlugin() // HMR 热替换模块 开发模式搭配WDS WDM使用
    )
  } else {
    modePlugins.push(
      new CleanWebpackPlugin({
        cleanOnceBeforeBuildPatterns: ['../../dist']
      }),
      new OptimizeCssAssetsWebpackPlugin({
        assetNameRegExp: /\.css$/g,
        cssProcessor: require('cssnano')
      }),
      new MiniCssExtractPlugin({
        filename: './static/css/[name]-[id].[chunkhash:8].bundle.css' // 指定打包后的css
      }), // 用来抽离css文件 不用打包到js文件里
      new BundleAnalyzerPlugin()
    )
  }
  return [].concat(modePlugins)
}
