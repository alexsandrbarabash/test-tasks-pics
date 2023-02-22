module.exports = {
  env: {
    commonjs: true,
    es6: true,
    node: true,
    jest: true,
  },
  extends: [
    'airbnb-base',
    'plugin:prettier/recommended',
    'plugin:security-node/recommended',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    'no-param-reassign': 'off',
    'no-sparse-arrays': 'off',
    'global-require': 'off',
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
  },
};