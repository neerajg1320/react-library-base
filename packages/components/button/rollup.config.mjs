import {babel} from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import external from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import commonjs from '@rollup/plugin-commonjs';
import {terser} from "rollup-plugin-terser";
import { readFile } from 'fs/promises';

const packageJson = JSON.parse(
    (await readFile(
        new URL('./package.json', import.meta.url)
    )).toString()
);

// console.log(`json:`, json);
const {src, main, module} = packageJson;

export default [
  {
    input: src,
    output: [
      {
        file: main,
        format: 'cjs',

      },
      {
        file: module,
        format: 'esm',

      }
    ],
    onwarn(warning, warn) {
      if (warning.code === 'THIS_IS_UNDEFINED') return;
      warn(warning);
    },
    plugins: [
      postcss({
        plugins:[],
        minimize: true,
        modules: true
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