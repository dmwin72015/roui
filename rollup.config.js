import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';
import external from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import dts from 'rollup-plugin-dts';
import { babel } from '@rollup/plugin-babel';

const pkg = require('./package.json');

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        file: pkg.main,
        format: 'cjs',
        sourcemap: true,
        name: 'rouui',
      },
      {
        file: pkg.module,
        format: 'esm',
        sourcemap: true,
      },
    ],
    plugins: [
      external(),
      resolve(),
      commonjs(),
      babel({ babelHelpers: 'bundled' }),
      typescript({ tsconfig: './tsconfig.json' }),
      postcss({
        extract: true,
        use: ['sass'],
        plugins: [
          require('autoprefixer')({
            overrideBrowserslist: ['last 2 version', '>1%', 'ios 7'],
          }),
          require('cssnano'),
        ],
      }),
      terser(),
    ],
  },
  {
    input: 'dist/esm/types/index.d.ts',
    output: [{ file: 'dist/index.d.ts', format: 'esm' }],
    external: [/\.css|scss$/],
    plugins: [dts()],
  },
];
