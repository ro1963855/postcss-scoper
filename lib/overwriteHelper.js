export const getOverwriteRegex = (selector, formattedOverwriteRegexes) => {
  return formattedOverwriteRegexes.find((overwriteRegex) => {
    return overwriteRegex.test(selector)
  })
}

export const overwrite = (selector, overwriteRegex, replacer) => {
  return selector.replace(overwriteRegex, replacer)
}
