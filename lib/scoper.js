const postcss = require('postcss')
const { formatSelector } = require('./selectorChecker')
const { isSkipSelector } = require('./ruleHelper')
const { isSkipAtRule } = require('./atruleHelper')
const { getOverwriteSelector, overwrite } = require('./overwriteHelper')

const processed = Symbol('processed')

const scoper = (options) => (css) => {
  const { scope, overwrites } = Object.assign({}, {
    scope: '',
    overwrites: [],
  }, options)

  const formattedScope = formatSelector(scope)
  const formattedOverwrites = overwrites.map((overwriteSelector) => {
    return formatSelector(overwriteSelector)
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

      const overwriteSelector = getOverwriteSelector(selector, formattedOverwrites)
      if (overwriteSelector) {
        return overwrite(selector, overwriteSelector, formattedScope)
      }

      return `${formattedScope} ${selector}`
    })
  })

  // return {
  //   postcssPlugin: 'scoper',
  //   prepare (result) {
  //     return {
  //       Rule (rule) {
  //         if (rule[processed]) return

  //         rule.selectors = rule.selectors.map((selector) => {
  //           if (isSkipSelector(selector)) return selector

  //           const overwriteSelector = getOverwriteSelector(selector, formattedOverwrites)
  //           if (overwriteSelector) {
  //             return overwrite(selector, overwriteSelector, formattedScope)
  //           }

  //           return `${formattedScope} ${selector}`
  //         })
  //       },
  //       AtRule (atRule) {
  //         if (isSkipAtRule(atRule.name)) {
  //           atRule.walkRules((rule) => {
  //             rule[processed] = true
  //           })
  //         }
  //       },
  //     }
  //   },
  // }
}

module.exports = postcss.plugin('postcss-scoper', scoper)
