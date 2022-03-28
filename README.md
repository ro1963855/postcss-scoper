[![npm version](https://img.shields.io/npm/v/postcss-scoper.svg)](https://www.npmjs.com/package/postcss-scoper) [![LICENSE](https://img.shields.io/npm/l/postcss-scoper.svg)](https://github.com/ro1963855/postcss-scoper/blob/master/LICENSE) [![Test](https://github.com/ro1963855/postcss-scoper/actions/workflows/test.yml/badge.svg)](https://github.com/ro1963855/postcss-scoper/actions/workflows/test.yml) [![Test Coverage](https://img.shields.io/codecov/c/github/ro1963855/postcss-scoper.svg)](https://app.codecov.io/gh/ro1963855/postcss-scoper)

# postcss-scoper

A [PostCSS] plugin to scoped css selectors.

````css
/* source css file */

#selector { /* content */ }

.selector { /* content */ }

.selector:hover { /* content */ }

.selector__element { /* content */ }

/* when set option overwrites: ['html'] */
html { /* content */ }

/* when set option overwrites: ['body'] */
body { /* content */ }

/* when set option overwrites: [] */
html { /* content */ }

/* when set option overwrites: [] */
body { /* content */ }
````

````css
/* output css file prefixed with ".scoped" */

.scoped #selector { /* content */ }

.scoped .selector { /* content */ }

.scoped .selector:hover { /* content */ }

.scoped .selector__element { /* content */ }

/* when set option overwrites: ['html'] */
.scoped { /* content */ }

/* when set option overwrites: ['body'] */
.scoped { /* content */ }

/* when set option overwrites: [] */
html { /* content */ }

/* when set option overwrites: [] */
body { /* content */ }
````

## Usage

`npm i -D postcss-scoper` or `yarn add -D postcss-scoper`

create a `postcss.config.js` with:

```js
module.exports = {
  plugins: [
    require('postcss-scoper')({
      scope: '.scoped',
      overwrites: ['html', 'body'],
    })
  ]
}
```

> Refer to [PostCSS Usage] on how to use it with your preferred build tool.

### Example

```js
const postcss = require('postcss');
const scoper = require('postcss-scoper');

const input = fs.readFileSync('path/to/file.css',  'utf-8');

const output = postcss([
  scoper({
    scope: '.scoped',
    overwrites: ['html', 'body'],
  })
]).process(input);
```

#### Options

| Name           | Description                                |
|------------------|--------------------------------------------|
|`scope` (string) | scoped style to be used                    |
|`overwrites` (array)  | replace selector in array by `scope` |
