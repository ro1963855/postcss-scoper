import { uglify } from 'rollup-plugin-uglify'

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
        toplevel: true,
      },
    }),
  ],
  external: ['postcss', 'css-selector-parser'],
}
