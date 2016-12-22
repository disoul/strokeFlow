/*
 * rollup.config.js
 * Copyright (C) 2016 disoul <disoul@DiSouldeMacBook-Pro.local>
 *
 * Distributed under terms of the MIT license.
 */
import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import postcss from 'rollup-plugin-postcss';

import simplevars from 'postcss-simple-vars';
import nested from 'postcss-nested';
import cssnano from 'cssnano';

export default {
  entry: 'src/main.js',
  dest:  'build/main.min.js',
  format: 'iife',
  sourceMap: 'inline',
  plugins: [
    postcss({
      plugins: [
        simplevars(),
        nested(),
        cssnano(),
      ],
      extensions: ['.css'],
    }),
    commonjs(),
    resolve({
      jsnext: true,
      main:   true,
      broswer:true,
    }),
    babel({
      runtimeHelpers: true,
      exclude: 'node_modules/**',
    }),
  ],
}
