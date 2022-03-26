const globalSkip = ['keyframes']

export const isSkipAtRule = (name) => globalSkip.some((skip) => {
  return name.startsWith(skip)
})
