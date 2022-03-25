const { plugin } = require('postcss')
const { formatSelector } = require('./selectorChecker')
const { isSkipSelector } = require('./ruleHelper')
const { isSkipAtRule } = require('./atruleHelper')
const { getOverwriteRegex, overwrite } = require('./overwriteHelper')

const processed = Symbol('processed')

const escapeRegExp = (string) => {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

const scoper = (options) => (css) => {
  const { scope, overwrites } = Object.assign({}, {
    scope: '',
    overwrites: [],
  }, options)

  const formattedScope = formatSelector(scope)
  const formattedOverwriteRegexes = overwrites
    .map((overwriteSelector) => {
      return formatSelector(overwriteSelector)
    }).map((overwriteSelector) => {
      return new RegExp(`^${escapeRegExp(overwriteSelector)}`)
    })

  css.walkAtRules((atRule) => {
    if (isSkipAtRule(atRule.name)) {
      atRule.walkRules((rule) => {
        rule[processed] = true
      })
    }
  })

  css.walkRules((rule) => {
    if (rule[processed]) return
    rule.selectors = rule.selectors.map((selector) => {
      if (isSkipSelector(selector)) return selector

      const overwriteRegex = getOverwriteRegex(selector, formattedOverwriteRegexes)
      if (overwriteRegex) {
        return overwrite(selector, overwriteRegex, formattedScope)
      }

      return `${formattedScope} ${selector}`
    })
  })
}

module.exports = plugin('postcss-scoper', scoper)
