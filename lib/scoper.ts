import { plugin } from 'postcss'
import { formatSelector } from './selectorChecker'
import { isSkipAtRule } from './atruleHelper'
import { isSkipSelector } from './ruleHelper'
import { getOverwrite, overwriteSelector } from './overwriteHelper'

const processed = Symbol('processed')

const scoper = (options) => (css) => {
  const { scope, overwrites } = Object.assign({}, {
    scope: '',
    overwrites: [],
  }, options)

  const formattedScope = formatSelector(scope)

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

      const overwrite = getOverwrite(selector, overwrites)
      if (overwrite) {
        return overwriteSelector(selector, overwrite, formattedScope)
      }

      return `${formattedScope} ${selector}`
    })
  })
}

export default plugin('postcss-scoper', scoper)
