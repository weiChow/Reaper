'use strict'

module.exports = function (babel) {
  babel.cache(true)

  const presets = [
    [
      '@babel/preset-env',
      {
        modules: 'commonjs'
      }
    ],
    '@babel/preset-react'
  ]

  const plugins = [
    [
      '@babel/plugin-transform-runtime',
      {
        corejs: {
          version: 3,
          proposals: true
        },
        helpers: true, // default
        regenerator: true, // default
        useESModules: false // default
      }
    ],
    [
      'import', // 按需加载
      {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true
      }
    ],
    [
      '@babel/plugin-proposal-decorators',
      {
        legacy: true
      }
    ],
    [
      '@babel/plugin-proposal-class-properties',
      {
        loose: true
      }
    ],
    '@babel/plugin-proposal-optional-chaining',
    '@babel/plugin-proposal-nullish-coalescing-operator',
    '@babel/plugin-proposal-do-expressions',
    '@babel/plugin-transform-exponentiation-operator',
    'react-hot-loader/babel'
  ]

  return {
    presets,
    plugins
  }
}
