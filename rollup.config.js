import { uglify } from 'rollup-plugin-uglify'
import typescript from '@rollup/plugin-typescript'

export default {
  input: 'lib/scoper.ts',
  output: {
    file: 'dist/bundle.js',
    format: 'cjs',
    exports: 'default',
  },
  plugins: [
    typescript(),
    uglify({
      mangle: {
        toplevel: true,
      },
    }),
  ],
  external: ['postcss', 'css-selector-parser'],
}
