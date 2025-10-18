/**
 * Base Rollup configuration for all country-specific packages
 * 
 * Usage in package rollup.config.js:
 * const baseConfig = require('../../configs/rollup.config.base');
 * module.exports = baseConfig;
 */

const resolve = require('@rollup/plugin-node-resolve').nodeResolve;
const commonjs = require('@rollup/plugin-commonjs');
const typescript = require('rollup-plugin-typescript2');
const peerDepsExternal = require('rollup-plugin-peer-deps-external');
const json = require('@rollup/plugin-json');
const pkg = require('./package.json');

module.exports = {
  input: 'src/index.ts',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      sourcemap: true,
    },
    {
      file: pkg.module,
      format: 'esm',
      sourcemap: true,
    },
  ],
  plugins: [
    peerDepsExternal(),
    resolve({
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
      exportConditions: ['node', 'browser'],
      dedupe: ['react', 'react-dom'],
    }),
    commonjs(),
    json(),
    typescript({ useTsconfigDeclarationDir: true }),
  ],
  external: ['react', 'react-dom'],
};

