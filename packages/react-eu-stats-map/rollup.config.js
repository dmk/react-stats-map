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
      dedupe: ['react', 'react-dom'], // Deduplicate React to ensure there's only one instance
    }),
    commonjs(),
    json(), // Add the JSON plugin here
    typescript({ useTsconfigDeclarationDir: true }),
  ],
  external: ['react', 'react-dom'],
};
