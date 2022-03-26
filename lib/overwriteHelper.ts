export const getOverwrite = (selector: string, overwrites: string[]) => {
  return overwrites.find((overwrite) => selector.startsWith(overwrite))
}

export const overwriteSelector = (selector: string, overwrite: string, replacer: string) => {
  return selector.replace(overwrite, replacer)
}
