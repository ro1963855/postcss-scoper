const globalSkip = [':root']

export const isSkipSelector = (selector) => globalSkip.includes(selector)
