const { readFileSync } = require('fs')
const { join } = require('path')
const postcss = require('postcss')
const scoper = require('../lib/scoper')

function read (name) {
  const file = join(__dirname, '/cases/' + name + '.css')
  return readFileSync(file).toString()
}

describe('scoper', () => {
  test('should throw when passing undefined scope', () => {
    expect(() => postcss()
      .use(scoper())
      .process('.a {}')
    ).toThrow(TypeError)
  })

  test('should throw when passing invalid scope type', () => {
    expect(() => postcss([scoper({
      scope: 0,
    })]).process('.a {}')).toThrow(TypeError)
  })

  test('should throw when passing invalid scope selector', () => {
    expect(() => postcss([scoper({
      scope: 'a >> b',
    })]).process('.a {}')).toThrow(TypeError)
  })

  test('should scope all selector css', () => {
    const { css } = postcss([scoper({
      scope: '.scope',
    })]).process(read('selector'))

    expect(css).toEqual(read('selector.out'))
  })

  test('should overwrite selector in the overwrite option', () => {
    const { css } = postcss([scoper({
      scope: '.scope',
      overwrites: ['html', 'body'],
    })]).process(read('overwrite'))

    expect(css).toEqual(read('overwrite.out'))
  })
})
