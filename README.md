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
      skipGlobal: false
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
