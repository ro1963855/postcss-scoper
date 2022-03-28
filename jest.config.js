module.exports = {
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  testEnvironment: 'jsdom',
  testRegex: '/test/.*\\.test?\\.ts$',
  moduleFileExtensions: ['ts', 'js'],
}
