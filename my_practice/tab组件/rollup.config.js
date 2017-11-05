// rollup.config.js
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import builtins from 'rollup-plugin-node-builtins';

export default {
  input: 'src/tab.js',
  output: {
    file: 'lib/tab.js',
    format: 'iife',
    name: "tab"
  },
  plugins: [
    resolve({
      preferBuiltins: true
    }),
    builtins(),
    commonjs({
      include: 'node_modules/jquery/**'
    }),
    babel({
      exclude: 'node_modules/**' // 只编译我们的源代码
    })
  ]
};