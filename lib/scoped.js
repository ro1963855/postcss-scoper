const postcss = require('postcss')
const { formatSelector } = require('./selectorChecker')
const { isSkipSelector } = require('./ruleHelper')
const { isSkipAtRule } = require('./atruleHelper')

const processed = Symbol('processed')

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
          if (rule[processed]) return

          rule.selectors = rule.selectors.map((selector) => {
            if (isSkipSelector(selector)) return selector

            if (formattedOverwrite.includes(selector)) {
              return formattedScope
            }

            return `${formattedScope} ${selector}`
          })
        },
        AtRule (atRule) {
          if (isSkipAtRule(atRule.name)) {
            atRule.walkRules((rule) => {
              rule[processed] = true
            })
          }
        },
      }
    },
  }
}

module.exports.postcss = true
