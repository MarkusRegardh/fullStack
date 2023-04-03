module.exports = {
  'env': {
    'es6': true,
    'browser': true,
    'node': true
  },
  'extends': ['eslint:recommended','plugin:react/recommended'],
  'plugins': ['react'],
  'overrides': [
  ],
  'parserOptions': {
    'ecmaVersion': 2021,
    'sourceType': 'module',
    'ecmaFeatures': {
      'jsx': true
    }
  },
  'rules': {
    'indent': [
      'error',
      2
    ],
    'linebreak-style': [
      'error',
      'unix'
    ],
    'quotes': [
      'error',
      'single'
    ],
    'semi': [
      'error',
      'never'
    ],
    'eqeqeq': 'error',
    'no-trailing-spaces': 'error',
    'object-curly-spacing': [
      'error', 'always'
    ],
    'arrow-spacing': [
      'error', { 'before': true, 'after': true }
    ],
    'no-console': 0

  }
}
