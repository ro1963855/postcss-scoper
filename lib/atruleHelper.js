const globalSkip = ['keyframes']

const isSkipAtRule = (name) => {
  if (globalSkip.includes(name)) return true

  return false
}

module.exports = {
  isSkipAtRule,
}
