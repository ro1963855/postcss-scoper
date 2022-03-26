const globalSkip = [':root']

export const isSkipSelector = (selector) => globalSkip.some((skip) => {
  return selector.startsWith(skip)
})
