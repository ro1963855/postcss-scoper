import { CssSelectorParser } from 'css-selector-parser'
const parser = new CssSelectorParser()

parser.registerSelectorPseudos('has')
parser.registerNestingOperators('>', '+', '~')
parser.registerAttrEqualityMods('^', '$', '*', '~')
parser.enableSubstitutes()

export const formatSelector = (selector) => {
  if (typeof selector !== 'string') {
    throw new TypeError(`@postcss-scoper: Invalid selector: ${selector}, scope options should be type of string.`)
  }

  const trimSelector = selector.trim()
  if (trimSelector === '') {
    throw new TypeError(`@postcss-scoper: Invalid selector: ${selector}, scope options should not be empty.`)
  }

  if (!isValidateSelector(trimSelector)) {
    throw new TypeError(`@postcss-scoper: Invalid selector: ${selector}, scope options should fit css selector rule`)
  }

  return trimSelector
}

export const isValidateSelector = (selector) => {
  try {
    parser.parse(selector)
  } catch (e) {
    return false
  }

  return true
}
