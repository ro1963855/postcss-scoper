import { readFileSync } from 'fs'
import { join } from 'path'
import postcss from 'postcss'
import scoper from '../lib/scoper'

function read (name: string) {
  const file = join(__dirname, '/cases/' + name + '.css')
  return readFileSync(file).toString()
}

describe('scoper', () => {
  test('should throw when passing undefined scope', () => {
    const results = postcss()
      .use(scoper())
      .process('.a {}')
    expect(() => results.css).toThrow()
  })

  test('should throw when passing invalid scope type', () => {
    const results = postcss()
      // @ts-ignore
      .use(scoper({ scope: 0 }))
      .process('.a {}')
    expect(() => results.css).toThrow()
  })

  test('should throw when passing invalid scope selector', () => {
    const results = postcss()
      .use(scoper({ scope: 'a >> b' }))
      .process('.a {}')
    expect(() => results.css).toThrow()
  })

  test('should scope all selector css', () => {
    const { css } = postcss()
      .use(scoper({ scope: '.scope' }))
      .process(read('selector'))

    expect(css).toEqual(read('selector.out'))
  })

  test('should overwrite selector in the overwrite option', () => {
    const { css } = postcss()
      .use(scoper({
        scope: '.scope',
        overwrites: ['html', 'body'],
      }))
      .process(read('overwrite'))

    expect(css).toEqual(read('overwrite.out'))
  })
})
