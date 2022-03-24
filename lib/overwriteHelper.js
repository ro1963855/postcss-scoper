const getOverwriteRegex = (selector, formattedOverwriteRegexes) => {
  return formattedOverwriteRegexes.find((overwriteRegex) => {
    return overwriteRegex.test(selector)
  })
}

const overwrite = (selector, overwriteRegex, replacer) => {
  return selector.replace(overwriteRegex, replacer)
}

module.exports = {
  getOverwriteRegex,
  overwrite,
}
