import { plugin, Root, Rule } from 'postcss'
import { formatSelector } from './selectorChecker'
import { isSkipAtRule } from './atruleHelper'
import { isSkipSelector } from './ruleHelper'
import { getOverwrite, overwriteSelector } from './overwriteHelper'

const processed = Symbol('processed')

interface ScoperOptions {
  scope: string;
  overwrites?: string[];
}

interface ScoperRule extends Rule {
  [processed: symbol]: boolean;
}

const scoper = (options: ScoperOptions) => (root: Root) => {
  const { scope, overwrites } = Object.assign({}, {
    scope: '',
    overwrites: [],
  }, options)

  const formattedScope = formatSelector(scope)

  root.walkAtRules((atRule) => {
    if (isSkipAtRule(atRule.name)) {
      atRule.walkRules((rule: ScoperRule) => {
        rule[processed] = true
      })
    }
  })

  root.walkRules((rule: ScoperRule) => {
    if (rule[processed]) return
    rule.selectors = rule.selectors.map((selector: string) => {
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
