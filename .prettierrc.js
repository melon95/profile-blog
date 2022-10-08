const prettierConfigStandard = require('prettier-config-standard')
const modifiedConfig = {
  ...prettierConfigStandard,
  trailingComma: 'all'
}

module.exports = modifiedConfig
