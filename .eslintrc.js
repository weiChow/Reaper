module.exports = {
  root: true,
  parser: 'babel-eslint',
  env: {
    browser: true,
    node: true,
    commonjs: true,
    es6: true
  },
  globals: {
    environment: 'readonly' // Specifying Globals
  },
  plugins: ['babel', 'react'], // Prettier will be automatically injected by plugin:prettier/recommended
  settings: {
    'import/resolver': 'webpack'
  },
  rules: {
    'react/no-string-refs': 'off',
    'no-debugger': 'off'
  },
  // extends eslint config
  extends: [
    'standard',
    'plugin:react/recommended',
    'plugin:prettier/recommended', // integrate eslint-plugin-prettier with eslint-config-prettier
    'prettier/babel',
    'prettier/react',
    'prettier/standard'
  ]
}
