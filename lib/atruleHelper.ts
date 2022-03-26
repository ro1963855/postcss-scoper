const globalSkip = ['keyframes']

export const isSkipAtRule = (name: string) => globalSkip.some((skip) => {
  return name.startsWith(skip)
})
