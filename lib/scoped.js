const postcss = require('postcss')
const { isSkipSelector } = require('./ruleHelper')
const { formatSelector } = require('./selectorChecker')

module.exports = (opts = {}) => {
  const { scope, overwrite } = Object.assign({}, {
    scope: '',
    overwrite: [],
  }, opts)

  const formattedScope = formatSelector(scope)
  const formattedOverwrite = overwrite.map((overwriteSelector) => {
    return formatSelector(overwriteSelector)
  })

  return {
    postcssPlugin: 'scoped',
    prepare (result) {
      return {
        Rule (rule) {
          rule.selectors = rule.selectors.map((selector) => {
            if (isSkipSelector(selector)) return selector

            if (formattedOverwrite.includes(selector)) {
              return formattedScope
            }

            return `${formattedScope} ${selector}`
          })
        },
      }
    },
  }
}

module.exports.postcss = true
