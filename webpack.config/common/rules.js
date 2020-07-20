'use strict'
/**
 * Created by weiChow on 2020/06/30
 * rules 模块规则（配置 loader、解析器等选项）
 */

const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = () => [
  {
    test: /\.js(x?)$/,
    exclude: /(node_modules|bower_components)/,
    use: ['babel-loader', 'eslint-loader']
  },
  {
    test: /\.css$/i,
    use: [
      process.env.NODE_ENV === 'dev' ? 'style-loader' : MiniCssExtractPlugin.loader,
      {
        loader: require.resolve('css-loader'),
        options: {
          modules: false
        }
      }
    ]
  },
  {
    test: /\.less$/i,
    use: [
      process.env.NODE_ENV === 'dev' ? 'style-loader' : MiniCssExtractPlugin.loader,
      {
        loader: require.resolve('css-loader'),
        options: {
          importLoaders: 2,
          modules: false
        }
      },
      {
        loader: 'postcss-loader',
        options: {
          plugins: () => [
            require('postcss-flexbugs-fixes'),
            require('autoprefixer')({
              overrideBrowserslist: ['last 2 versions', '> 5%']
            })
          ]
        }
      },
      {
        loader: 'less-loader',
        options: {
          lessOptions: {
            javascriptEnabled: true
          }
        }
      }
    ]
  },
  {
    test: /\.(png|jpg|gif|svg|ico|gltf|glb)$/i, // i不区分大小写
    use: [
      {
        loader: 'url-loader', // url-loader(可进行构建配置)作用与file-loader相同 内部使用file-loader
        options: {
          limit: 3072,
          name: '[name]_[hash:8].[ext]',
          outputPath: './static/images'
        }
      }
    ]
  },
  // 字体 图标
  {
    test: /\.(ttf|eot|woff|woff2|otf)$/i,
    use: [
      {
        loader: 'url-loader', // url-loader(可进行构建配置)作用与file-loader相同 内部使用file-loader
        options: {
          limit: 3072,
          name: '[name]_[hash:8].[ext]',
          outputPath: './static/fonts'
        }
      }
    ]
  },
  // 数据
  {
    test: [/\.json$/i],
    exclude: /(node_modules|bower_components)/,
    use: [
      {
        loader: 'url-loader', // url-loader(可进行构建配置)作用与file-loader相同 内部使用file-loader
        options: {
          limit: 30720,
          name: '[name]_[hash:8].[ext]',
          outputPath: './static/data'
        }
      }
    ]
  }
]
