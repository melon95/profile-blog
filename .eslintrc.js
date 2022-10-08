const config = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    // standard的ts规则
    'standard-with-typescript',
    // react的默认规则
    'plugin:react/recommended',
    // react-hooks规则
    'plugin:react-hooks/recommended',
    // 不需要引入React
    'plugin:react/jsx-runtime',
    // 避免prettier和eslint冲突
    'plugin:prettier/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
    tsconfigRootDir: __dirname,
    project: 'tsconfig.json',
  },
  rules: {
    '@typescript-eslint/no-floating-promises': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    // 数组对象最后一行的行尾逗号
    'comma-dangle': 'always',
  },
}

module.exports = config
