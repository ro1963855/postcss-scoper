const globalSkip = [':root']

const isSkipSelector = (selector) => globalSkip.includes(selector)

module.exports = {
  isSkipSelector,
}
