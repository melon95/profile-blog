const config = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    // react的默认规则
    'plugin:react/recommended',
    // standard的ts规则
    'standard-with-typescript',
    // react-hooks规则
    'plugin:react-hooks/recommended',
    // 避免prettier和eslint冲突
    'plugin:prettier/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    '@typescript-eslint/no-floating-promises': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    // 数组对象最后一行的行尾逗号
    'comma-dangle': 'always',
  },
}

module.exports = config
