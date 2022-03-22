const globalSkip = [':root']

const isSkipSelector = (selector) => {
  if (globalSkip.includes(selector)) return true

  return false
}

module.exports = {
  isSkipSelector,
}
