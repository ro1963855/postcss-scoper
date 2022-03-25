module.exports = {
  env: {
    es6: true,
    node: true
  },
  extends: [
    "plugin:jest/recommended"
  ],
  rules: {
    indent: ['error', 2],
    quotes: ['error', 'single'],
    semi: ['error', 'never'],
    'arrow-parens': ['error', 'always'],
    'key-spacing': 'error',
    'comma-spacing': 'error',
    'arrow-spacing': 'error',
    'eol-last': ['error', 'always'],
    'comma-dangle': ['error', 'always-multiline'],
    'object-curly-spacing': ['error', 'always'],
    'keyword-spacing': 'error',
    'space-before-blocks': 'error',
    'space-before-function-paren': ['error', 'always'],
    'prefer-const': 'error',
    'no-undef': 'error',
    'quote-props': ["error", "consistent-as-needed"],
    'sort-imports': ["error", {
      "ignoreDeclarationSort": true,
      "ignoreMemberSort": false,
    }]
  },
  parserOptions: {
    sourceType: "module",
  }
};
