const globalSkip = ['keyframes']

const isSkipAtRule = (name) => globalSkip.includes(name)

module.exports = {
  isSkipAtRule,
}
