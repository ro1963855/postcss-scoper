const postcss = require('postcss')
const { isSkipSelector } = require('./ruleHelper')
const { formatSelector } = require('./selectorChecker')

module.exports = (opts = {}) => {
  const { scope } = Object.assign({}, {
    scope: '',
  }, opts)

  const formattedScope = formatSelector(scope)

  return {
    postcssPlugin: 'scoped',
    prepare (result) {
      return {
        Rule (rule) {
          rule.selectors = rule.selectors.map((selector) => {
            if (isSkipSelector(selector)) return selector
            return `${formattedScope} ${selector}`
          })
        },
      }
    },
  }
}

module.exports.postcss = true
