import { uglify } from 'rollup-plugin-uglify'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'

export default {
  input: 'lib/scoper.js',
  output: {
    file: 'dist/bundle.js',
    format: 'cjs',
    exports: 'default',
  },
  plugins: [
    uglify({
      mangle: {
        toplevel: false,
      },
    }),
    resolve(),
    commonjs({
      include: ['node_modules/**'],
      dynamicRequireTargets: [
        'node_modules/postcss/lib/css-syntax-error.js',
        'node_modules/postcss/lib/parse.js',
        'node_modules/postcss/lib/container.js',
      ],
    }),
  ],
}
