const postcss = require('postcss')

module.exports = (opts = {}) => {
  const { scope } = Object.assign({}, {
    scope: '',
  }, opts)

  if (typeof scope !== 'string') {
    throw new TypeError('@postcss-scoped: scope option should be of type string.')
  }

  if (scope.trim() === '') {
    throw new TypeError('@postcss-scoped: scope option should not be empty')
  }

  return {
    postcssPlugin: 'scoped',
    prepare (result) {
      return {
        Rule (rule) {
          rule.selectors = rule.selectors.map((selector) => {
            return scope + ' ' + selector
          })
        },
      }
    },
  }
}

module.exports.postcss = true
