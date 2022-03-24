const { readFileSync } = require('fs')
const { join } = require('path')
const postcss = require('postcss')
const scoped = require('../lib/scoped')

function read (name) {
  const file = join(__dirname, '/cases/' + name + '.css')
  return readFileSync(file).toString()
}

describe('scoped', () => {
  test('should throw when passing undefined scope', () => {
    expect(() => postcss()
      .use(scoped())
      .process('.a {}')
    ).toThrow(TypeError)
  })

  test('should throw when passing invalid scope type', () => {
    expect(() => postcss([scoped({
      scope: 0,
    })]).process('.a {}')).toThrow(TypeError)
  })

  test('should throw when passing invalid scope selector', () => {
    expect(() => postcss([scoped({
      scope: 'a >> b',
    })]).process('.a {}')).toThrow(TypeError)
  })

  test('should scope all selector css', () => {
    const { css } = postcss([scoped({
      scope: '.scope',
    })]).process(read('selector'))

    expect(css).toEqual(read('selector.out'))
  })

  test('should overwrite selector in the overwrite option', () => {
    const { css } = postcss([scoped({
      scope: '.scope',
      overwrites: ['html', 'body'],
    })]).process(read('overwrite'))

    expect(css).toEqual(read('overwrite.out'))
  })
})
