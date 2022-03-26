const globalSkip = [':root']

export const isSkipSelector = (selector: string) => globalSkip.some((skip) => {
  return selector.startsWith(skip)
})
