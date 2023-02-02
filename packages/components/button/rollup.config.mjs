import {babel} from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import external from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import commonjs from '@rollup/plugin-commonjs';
import {terser} from "rollup-plugin-terser";

export default [
  {
    input: './lib/button.js',
    output: [
      {
        file: 'dist/index.js',
        format: 'cjs',
        exports: 'default'
      },
      {
        file: 'dist/index.es.js',
        format: 'es',
        exports: 'named',
      }
    ],
    onwarn(warning, warn) {
      if (warning.code === 'THIS_IS_UNDEFINED') return;
      warn(warning);
    },
    plugins: [
      postcss({
        plugins:[],
        minimize: true
      }),
      babel({
        presets: ['@babel/preset-env', '@babel/preset-react'],
        babelHelpers: 'bundled',
      }),
      external(),
      commonjs(),
      resolve(),
      terser()
    ]
  }
]