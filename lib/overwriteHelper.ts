export const getOverwrite = (selector, overwrites) => {
  return overwrites.find((overwrite) => selector.startsWith(overwrite))
}

export const overwriteSelector = (selector, overwrite, replacer) => {
  return selector.replace(overwrite, replacer)
}
