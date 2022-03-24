const getOverwriteSelector = (selector, overwrites) => {
  return overwrites.find((overwriteSelector) => {
    return new RegExp(`^${escapeRegExp(overwriteSelector)}`).test(selector)
  })
}

const overwrite = (selector, overwriteSelector, replacer) => {
  return selector.replace(new RegExp(`^${escapeRegExp(overwriteSelector)}`), replacer)
}

const escapeRegExp = (string) => {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

module.exports = {
  getOverwriteSelector,
  overwrite,
}
