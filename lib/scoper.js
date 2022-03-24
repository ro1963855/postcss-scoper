const postcss = require('postcss')
const { formatSelector } = require('./selectorChecker')
const { isSkipSelector } = require('./ruleHelper')
const { isSkipAtRule } = require('./atruleHelper')
const { getOverwriteSelector, overwrite } = require('./overwriteHelper')

const processed = Symbol('processed')

module.exports = (opts = {}) => {
  const { scope, overwrites } = Object.assign({}, {
    scope: '',
    overwrites: [],
  }, opts)

  const formattedScope = formatSelector(scope)
  const formattedOverwrites = overwrites.map((overwriteSelector) => {
    return formatSelector(overwriteSelector)
  })

  return {
    postcssPlugin: 'scoper',
    prepare (result) {
      return {
        Rule (rule) {
          if (rule[processed]) return

          rule.selectors = rule.selectors.map((selector) => {
            if (isSkipSelector(selector)) return selector

            const overwriteSelector = getOverwriteSelector(selector, formattedOverwrites)
            if (overwriteSelector) {
              return overwrite(selector, overwriteSelector, formattedScope)
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
