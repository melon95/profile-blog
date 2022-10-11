const prettierConfigStandard = require('prettier-config-standard')

const config = {
  ...prettierConfigStandard,
  trailingComma: 'all',
  overrides: [
    {
      files: '*.md(x)?',
      options: {
        parser: 'md',
      },
    },
  ],
}
module.exports = config
