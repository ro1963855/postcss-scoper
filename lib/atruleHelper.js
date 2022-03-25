const globalSkip = ['keyframes']

export const isSkipAtRule = (name) => globalSkip.includes(name)
