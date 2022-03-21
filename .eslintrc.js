module.exports = {
  env: {
    es6: true
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
  },
  plugins: [
    "jest",
  ],
};
